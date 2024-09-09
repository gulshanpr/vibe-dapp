// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VibeCheck {
    struct Post {
        string postURL;
        string[] vibeTagsOfThisPost;
        string auraPointOfThisPost;
    }

    struct User {
        string username;
        address addr;
        string[] allVibes;
        uint256 vibeCount;
        string[] auraPoints;
        uint256 totalAuraPoint;
        int256 gyaatLevel;
        string[] customVibeTagsBought;
        string[] customVibeTagsAvailableToUse;
    }

    mapping(address => User) public users;
    mapping(address => Post[]) public userPosts;
    address[] public userAddresses;

    event UserCreated(address indexed userAddress, string username);
    event PostAdded(address indexed userAddress, uint256 indexed postIndex);

    function createUser(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(users[msg.sender].addr == address(0), "User already exists");

        User storage newUser = users[msg.sender];
        newUser.username = _username;
        newUser.addr = msg.sender;
        newUser.allVibes = new string[](0);
        newUser.auraPoints = new string[](0);
        newUser.customVibeTagsBought = new string[](0);
        newUser.customVibeTagsAvailableToUse = new string[](0);
        newUser.vibeCount = 0;
        newUser.totalAuraPoint = 0;
        newUser.gyaatLevel = 0;

        userAddresses.push(msg.sender);

        emit UserCreated(msg.sender, _username);
    }

    function addPost(string memory _postURL) public {
        require(users[msg.sender].addr != address(0), "User does not exist");
        require(bytes(_postURL).length > 0, "Post URL cannot be empty");

        Post memory newPost = Post({
            postURL: _postURL,
            vibeTagsOfThisPost: new string[](0),
            auraPointOfThisPost: ""
        });

        userPosts[msg.sender].push(newPost);

        emit PostAdded(msg.sender, userPosts[msg.sender].length - 1);
    }

    function getUserDetails(address _userAddress) public view returns (
        string memory username,
        uint256 vibeCount,
        uint256 totalAuraPoint,
        int256 gyaatLevel,
        uint256 postCount
    ) {
        User storage user = users[_userAddress];
        require(user.addr != address(0), "User does not exist");

        return (
            user.username,
            user.vibeCount,
            user.totalAuraPoint,
            user.gyaatLevel,
            userPosts[_userAddress].length
        );
    }

    function getUserPostDetails(address _userAddress, uint256 _postIndex) public view returns (
        string memory postURL,
        string[] memory vibeTags,
        string memory auraPoint
    ) {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");

        Post storage post = userPosts[_userAddress][_postIndex];
        return (
            post.postURL,
            post.vibeTagsOfThisPost,
            post.auraPointOfThisPost
        );
    }

    function getUserCount() public view returns (uint256) {
        return userAddresses.length;
    }
}