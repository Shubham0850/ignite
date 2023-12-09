// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;



import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// Minimal interface for Aave Lending Pool
interface ILendingPool {
    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external payable;

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external returns (uint256);
}

// Minimal interface for Aave Lending Pool Addresses Provider
interface ILendingPoolAddressesProvider {
    function getLendingPool() external view returns (address);
}

contract DatingStacking {
    ILendingPoolAddressesProvider public addressesProvider;

    // Chainlink time oracle
    AggregatorV3Interface public chainlinkTimeOracle;

    // Mapping to track conversations and staked ETH
    mapping(address => Conversation) public conversations;

    // Timestamp of the last yield transfer
    uint256 public lastYieldTransferTime;

    // Mapping to track user's deposited ETH
    mapping(address => uint256) public userStakedEth;

    // Structure for conversation data
    struct Conversation {
        address initiator;
        address receiver;
        uint256 stakedEth;
        uint256 startTime;
        bool isActive;
    }

    // Events
    event EthStacked(address indexed user, uint256 amount);
    event StEthUnstacked(address indexed user, uint256 amount);
    event ConversationStarted(
        address indexed initiator,
        address indexed receiver,
        uint256 stakedEth
    );
    event ConversationEnded(
        address indexed initiator,
        address indexed receiver,
        uint256 refundedEth,
        uint256 earnedYield
    );

    // Constructor
    constructor(address _provider, address _chainlinkTimeOracle) {
        addressesProvider = ILendingPoolAddressesProvider(_provider);
        chainlinkTimeOracle = AggregatorV3Interface(_chainlinkTimeOracle);
    }

    // Stack ETH and deposit to Lido
    function stackEth() public payable {
        require(msg.value > 0, "Amount must be greater than 0");

        // Get the lending pool address
        ILendingPool lendingPool = ILendingPool(
            addressesProvider.getLendingPool()
        );

        // Deposit ETH to the Aave Lending Pool
        // Aave uses a referral code system, which you can set to 0 if not applicable
        lendingPool.deposit{value: msg.value}(
            address(0),
            msg.value,
            msg.sender,
            0
        );

        // 2. Update user's staked Aave LP balance
        userStakedEth[msg.sender] += msg.value;

        emit EthStacked(msg.sender, msg.value);
    }

    // Withdraw ETH from Lido and update user stake
    function withdrawEth(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");

        // Check user's staked ETH
        uint256 userBalance = userStakedEth[msg.sender];
        require(amount <= userBalance, "Insufficient ETH balance");

        // Get the lending pool address
        ILendingPool lendingPool = ILendingPool(
            addressesProvider.getLendingPool()
        );

        // Withdraw ETH from Aave Lending Pool
        uint256 withdrawn = lendingPool.withdraw(
            address(0),
            amount,
            msg.sender
        );

        // Update user's staked ETH
        userStakedEth[msg.sender] -= amount;

        // Transfer withdrawn ETH to user
        payable(msg.sender).transfer(amount);

        emit StEthUnstacked(msg.sender, amount);
    }

    // Initiate a conversation
    function startConversation(address receiver) public {
        require(msg.value > 0, "Staking amount must be greater than 0");
        require(
            conversations[msg.sender].isActive == false,
            "You already have an active conversation"
        );

        conversations[msg.sender] = Conversation({
            initiator: msg.sender,
            receiver: receiver,
            stakedEth: msg.value,
            startTime: block.timestamp,
            isActive: true
        });

        emit ConversationStarted(msg.sender, receiver, msg.value);
    }

    // End conversation as initiator
    function endConversationAsInitiator() public {
        Conversation memory conversation = conversations[msg.sender];
        require(
            conversation.initiator == msg.sender,
            "You are not the initiator of this conversation"
        );
        require(conversation.isActive == true, "Conversation is already ended");

        uint256 refundAmount = conversation.stakedEth;
        uint256 yieldAmount = calculateYield(conversation.startTime); // Implement yield calculation based on conversation duration

        // Transfer refund and yield
        payable(msg.sender).transfer(refundAmount + yieldAmount);

        conversation.isActive = false;
        conversations[msg.sender] = conversation;

        emit ConversationEnded(
            msg.sender,
            conversation.receiver,
            refundAmount,
            yieldAmount
        );
    }

    // End conversation as receiver
    function endConversationAsReceiver() public {
        Conversation memory conversation = conversations[msg.sender];
        require(
            conversation.receiver == msg.sender,
            "You are not the receiver of this conversation"
        );
        require(conversation.isActive == true, "Conversation is already ended");

        uint256 refundAmount = conversation.stakedEth / 2;
        uint256 yieldAmount = calculateYield(conversation.startTime); // Calculate yield based on conversation duration

        // Transfer refund and half of yield to contract
        payable(address(this)).transfer(refundAmount + yieldAmount / 2);

        conversation.isActive = false;
        conversations[msg.sender] = conversation;

        emit ConversationEnded(
            conversation.initiator,
            msg.sender,
            refundAmount,
            yieldAmount / 2
        );
    }

    // Calculate yield based on conversation duration
    function calculateYield(uint256 startTime) internal view returns (uint256) {
        uint256 duration = block.timestamp - startTime; // Calculate conversation duration
        // Implement your yield calculation logic here based on duration
        // This is a placeholder example
        return duration * 100; // Replace with your actual yield calculation
    }

    // Transfer full amount after 7 days to Ignite Wallet
    function transferYield() public {
        // Fetch current timestamp from Chainlink oracle
        (, int256 answer, , uint256 updatedAt, ) = chainlinkTimeOracle
            .latestRoundData();
        uint256 currentTimestamp = uint256(answer); // or use updatedAt based on your need

        // Check if at least 7 days have passed since last transfer
        uint256 timeSinceTransfer = currentTimestamp - lastYieldTransferTime;
        require(
            timeSinceTransfer >= 7 days,
            "Not enough time has passed since last transfer"
        );

        // Calculate earned yield
        uint256 earnedYield = calculateYield(
            lastYieldTransferTime,
            currentTimestamp
        );

        // Transfer yield to the contract itself
        payable(address(this)).transfer(earnedYield);

        // Update last transfer time
        lastYieldTransferTime = currentTimestamp;
    }
}
