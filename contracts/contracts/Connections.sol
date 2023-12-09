// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Connections {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    struct Connection {
        address initiator;
        address receiver;
        uint256 amountStaked;
        bool connectionEnded;
        uint256 lastElapsedTimestamp;
        address disconnectorAddress;
    }

    IERC20 public usdc;

    address constant BASE_USDC = 0xF175520C52418dfE19C8098071a252da48Cd1C19;

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        usdc = IERC20(BASE_USDC);
        owner = msg.sender;
    }

    mapping(uint256 => Connection) public connections;
    Counters.Counter private connectionIdCounter;

    event NewConnection(
        uint256 connectionId,
        address initiator,
        address receiver,
        uint256 amountStaked
    );

    function createConnection(
        address _receiver,
        uint256 _amountStaked
    ) external {
        require(
            msg.sender != _receiver,
            "Initiator and receiver must be different"
        );

        uint256 connectionId = connectionIdCounter.current();

        Connection storage newConnection = connections[connectionId];
        newConnection.initiator = msg.sender;
        newConnection.receiver = _receiver;
        newConnection.amountStaked = _amountStaked;
        newConnection.connectionEnded = false;
        newConnection.lastElapsedTimestamp = block.timestamp;
        newConnection.disconnectorAddress = address(0);

        usdc.safeTransferFrom(
            address(msg.sender),
            address(this),
            _amountStaked
        );

        emit NewConnection(connectionId, msg.sender, _receiver, _amountStaked);

        connectionIdCounter.increment();
    }

    function disconnect(uint256 _connectionId, address disconnector) external {
        Connection storage connection = connections[_connectionId];
        uint256 daysDiff = (block.timestamp - connection.lastElapsedTimestamp);

        if (disconnector == connection.initiator && daysDiff < 7 days) {
            uint256 receiversShare = (connection.amountStaked * 20) / 100;
            usdc.safeTransferFrom(
                address(this),
                connection.receiver,
                receiversShare
            );
        } else {
            if (daysDiff < 7 days) {
                uint256 receiversShare = (connection.amountStaked * 10) / 100;
                uint256 initiatorShare = (connection.amountStaked * 75) / 100;

                usdc.safeTransferFrom(
                    address(this),
                    connection.receiver,
                    receiversShare
                );
                usdc.safeTransferFrom(
                    address(this),
                    connection.initiator,
                    initiatorShare
                );
            } else if (daysDiff > 7 days && daysDiff < 14 days) {
                uint256 receiversShare = (connection.amountStaked * 50) / 100;
                uint256 initiatorShare = (connection.amountStaked * 10) / 100;

                usdc.safeTransferFrom(
                    address(this),
                    connection.receiver,
                    receiversShare
                );
                usdc.safeTransferFrom(
                    address(this),
                    connection.initiator,
                    initiatorShare
                );
            } else {
                uint256 receiversShare = (connection.amountStaked * 60) / 100;
                uint256 initiatorShare = (connection.amountStaked * 10) / 100;

                usdc.safeTransferFrom(
                    address(this),
                    connection.receiver,
                    receiversShare
                );
                usdc.safeTransferFrom(
                    address(this),
                    connection.initiator,
                    initiatorShare
                );
            }
        }
        connection.disconnectorAddress = disconnector;
        connection.connectionEnded = true;
    }

    function restake(uint256 _connectionId) external {
        Connection storage connection = connections[_connectionId];
        connection.disconnectorAddress = address(0);
        connection.connectionEnded = false;
    }
}
