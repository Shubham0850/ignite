// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract ConnectionProfile {
    using Counters for Counters.Counter;

    struct Profile {
        address userAAaddress;
        string cid;
        string gender;
        address currentRequestForMatch;
        address currentMatch;
        uint256 totalRewards;
        uint256 amount;
        bool isVerified;
        bool isConnectionPlusUser;
    }

    mapping(address => Profile) public users;
    address[] public allUserAddresses;
    address public owner;
    Counters.Counter private connectionIdCounter;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function withdrawFunds(uint256 _amount) external onlyOwner {
        require(
            _amount > 0 && address(this).balance >= _amount,
            "Invalid amount or insufficient funds"
        );

        payable(owner).transfer(address(this).balance);
    }

    event NewReward(address indexed userAAaddress, uint256 totalRewards);
    event NewVerifiedUser(address indexed userAAaddress);
    event NewConnectionPlusUser(address indexed userAAaddress);
    event CurrentRequestForMatchUpdated(
        address indexed userAAaddress,
        address newRequestForMatch
    );
    event MatchAccepted(
        address indexed userAAaddress,
        address indexed otherParty,
        address newMatch
    );

    function getAllUsers() external view returns (Profile[] memory) {
        uint256 totalUsers = connectionIdCounter.current();
        Profile[] memory allProfiles = new Profile[](totalUsers);

        for (uint256 i = 0; i < totalUsers; i++) {
            allProfiles[i] = users[allUserAddresses[i]];
        }

        return allProfiles;
    }

    function createUserProfile(
        string memory _cid,
        string memory _gender
    ) public {
        Profile memory newProfile = Profile({
            userAAaddress: msg.sender,
            cid: _cid,
            gender: _gender,
            currentRequestForMatch: address(0),
            currentMatch: address(0),
            totalRewards: 0,
            amount: 10,
            isVerified: false,
            isConnectionPlusUser: false
        });

        users[msg.sender] = newProfile;
        allUserAddresses.push(msg.sender);
        connectionIdCounter.increment();
    }

    function getUserById(
        address _userAAaddress
    ) external view returns (Profile memory) {
        return users[_userAAaddress];
    }

    function updateCurrentRequestForMatch(
        address _newRequestForMatch
    ) external {
        require(_newRequestForMatch != msg.sender, "Cannot request self match");

        Profile storage userProfile = users[msg.sender];
        Profile storage reciverProfile = users[_newRequestForMatch];

        userProfile.currentRequestForMatch = _newRequestForMatch;
        reciverProfile.currentRequestForMatch = msg.sender;

        emit CurrentRequestForMatchUpdated(msg.sender, _newRequestForMatch);
    }

    function updateUserReward(
        address _userAAaddress,
        uint256 _newReward
    ) external {
        Profile storage user = users[_userAAaddress];
        user.totalRewards += _newReward;
        emit NewReward(_userAAaddress, user.totalRewards);
    }

    function markUserAsVerified(address _userAAaddress) external {
        require(
            msg.sender != _userAAaddress,
            "Users can't mark themselves as verified"
        );

        Profile storage user = users[_userAAaddress];
        user.isVerified = true;

        emit NewVerifiedUser(_userAAaddress);
    }

    function setCustomAmount(uint256 amount) external payable {
        Profile storage user = users[msg.sender];
        require(
            user.isConnectionPlusUser,
            "only plus users can set custom values"
        );

        user.amount = amount;
    }

    function markUserAsConnectionPlus(address _userAAaddress) external payable {
        require(msg.value != 0, "Value cannot be empty");

        payable(address(this)).transfer(msg.value);
        Profile storage user = users[_userAAaddress];
        user.isConnectionPlusUser = true;

        emit NewConnectionPlusUser(_userAAaddress);
    }

    function acceptMatch(address _otherParty) external {
        Profile storage userProfile = users[msg.sender];
        Profile storage otherProfile = users[_otherParty];

        require(
            userProfile.currentRequestForMatch == _otherParty,
            "Needs to request before accepting"
        );

        userProfile.currentMatch = userProfile.currentRequestForMatch;
        otherProfile.currentMatch = userProfile.currentMatch;

        userProfile.currentRequestForMatch = address(0);
        otherProfile.currentRequestForMatch = address(0);

        emit MatchAccepted(msg.sender, _otherParty, userProfile.currentMatch);
    }
}
