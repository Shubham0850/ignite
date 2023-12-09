// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract DatingStakes {
    struct Stake {
        uint256 amount;
        uint256 stakedAt;
        bool aDeclined;
        bool bDeclined;
        uint256 declinedAt;
    }

    // Uniswap router address for the network you're using (e.g., Ethereum mainnet)
    address private constant UNISWAP_ROUTER_ADDRESS = "...";

    // Uniswap Router Interface
    IUniswapV2Router02 private uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);

    // Event for liquidity added
    event LiquidityAdded(address indexed user, uint256 tokenAmount, uint256 ethAmount);

    mapping(address => mapping(address => Stake)) public stakes;

    event Staked(address indexed from, address indexed to, uint256 amount);
    event Declined(
        address indexed decliner,
        address indexed other,
        uint256 amount
    );

    function stake(address _to) public payable {
        require(msg.value > 0, "Stake must be greater than 0");
        stakes[msg.sender][_to] = Stake({
            amount: msg.value,
            stakedAt: block.timestamp,
            aDeclined: false,
            bDeclined: false,
            declinedAt: 0
        });
        emit Staked(msg.sender, _to, msg.value);
    }

    function bDecline(address _from) public {
        Stake storage stake = stakes[_from][msg.sender];
        require(stake.amount > 0, "No stake to decline");
        require(!stake.bDeclined, "Already declined");

        stake.bDeclined = true;
        stake.declinedAt = block.timestamp;

        uint256 timePassed = block.timestamp - stake.stakedAt;
        uint256 refundAmount;
        uint256 yieldAmount;
        // Calculate the refund amount and yield based on the time passed
        if (timePassed < 7 days) {
            refundAmount = (stake.amount * 75) / 100;
            yieldAmount = (stake.amount * 10) / 100;
            // remaining 15% goes to the platform
        } else if (timePassed < 14 days) {
            refundAmount = (stake.amount * 25) / 100;
            yieldAmount = (stake.amount * 50) / 100;
            // remaining 25% goes to the platform
        } else {
            refundAmount = (stake.amount * 40) / 100;
            yieldAmount = (stake.amount * 60) / 100;
            // no rest because 40% refund + 60% yield = 100%
        }

        // Transfer the refund to A
        payable(_from).transfer(refundAmount);
        // Transfer the yield to B
        payable(msg.sender).transfer(yieldAmount);

        // Emit event
        emit Declined(msg.sender, _from, stake.amount);

        // Reset the stake
        delete stakes[_from][msg.sender];
    }

    // Additional function within the DatingStakes contract

    function aDecline(address _to) public {
        Stake storage stake = stakes[msg.sender][_to];
        require(stake.amount > 0, "No stake to decline");
        require(!stake.aDeclined, "Already declined by A");
        require(
            block.timestamp - stake.stakedAt < 7 days,
            "Decline period has passed"
        );

        stake.aDeclined = true;
        stake.declinedAt = block.timestamp;

        // The logic assumes that if A declines within 7 days, B gets the yield
        // and the platform gets the rest. Adjust the percentages as needed.
        uint256 yieldAmount = (stake.amount * 10) / 100; // B gets 10%
        uint256 platformAmount = stake.amount - yieldAmount; // platform gets the rest

        // Transfer the yield to B
        payable(_to).transfer(yieldAmount);
        // Consider how the platform amount should be handled, whether it should be transferred
        // to a wallet or held within the contract for later distribution.

        emit Declined(msg.sender, _to, stake.amount);

        // Reset the stake
        delete stakes[msg.sender][_to];
    }

	// Stack ETH, add liquidity to Uniswap, and then stake LP tokens
    function stakeEthOnUniswap() public payable {
        require(msg.value > 0, "Amount must be greater than 0");

        // Half of the ETH for swapping to the other token in the pair
        uint256 halfEth = msg.value / 2;

        // Swap half of the ETH for the other token
        uint256 otherTokenAmount = swapEthForToken(halfEth, otherTokenAddress);

        // Approve token transfer to cover all possible scenarios
        IERC20(otherTokenAddress).approve(UNISWAP_ROUTER_ADDRESS, otherTokenAmount);

        // Add liquidity to Uniswap
        (uint256 tokenAmountUsed, uint256 ethAmountUsed, uint256 liquidity) = uniswapRouter.addLiquidityETH{ value: halfEth }(
            otherTokenAddress,
            otherTokenAmount,
            0, // slippage is unavoidable
            0, // slippage is unavoidable
            address(this),
            block.timestamp + 15 minutes
        );

        // Emit an event for liquidity addition
        emit LiquidityAdded(msg.sender, tokenAmountUsed, ethAmountUsed);

        // Additional logic to stake the LP tokens
        // ...

        // Return any leftover ETH to the user
        if (msg.value > ethAmountUsed) {
            payable(msg.sender).transfer(msg.value - ethAmountUsed);
        }
    }
}
