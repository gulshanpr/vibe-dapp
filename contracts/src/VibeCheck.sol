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
    event VibeTagsUpdated(address indexed userAddress, uint256 indexed postIndex);
    event AuraPointUpdated(address indexed userAddress, uint256 indexed postIndex);
    event CustomVibeTagsBoughtUpdated(address indexed userAddress);
    event CustomVibeTagsAvailableToUseUpdated(address indexed userAddress);
    event AllVibesUpdated(address indexed userAddress);

    function createUser(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(users[msg.sender].addr == address(0), "User already exists");

        User storage newUser = users[msg.sender];
        newUser.username = _username;
        newUser.addr = msg.sender;
        newUser.allVibes = new string[](0) ;
        newUser.auraPoints = new string[](0) ;
        newUser.customVibeTagsBought = new string[](0) ;
        newUser.customVibeTagsAvailableToUse = new string[](0) ;
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
            vibeTagsOfThisPost: new string[](0) ,
            auraPointOfThisPost: ""
        });

        userPosts[msg.sender].push(newPost);
        emit PostAdded(msg.sender, userPosts[msg.sender].length - 1);
    }

    function setVibeTagsOfPost(address _userAddress, uint256 _postIndex, string[] memory _vibeTags) public {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");

        Post storage post = userPosts[_userAddress][_postIndex];
        for (uint256 i = 0; i < _vibeTags.length; i++) {
            post.vibeTagsOfThisPost.push(_vibeTags[i]);
        }

        updateUserVibesAndAuraPoints(_userAddress);
        emit VibeTagsUpdated(_userAddress, _postIndex);
    }

    function setAuraPointOfPost(address _userAddress, uint256 _postIndex, string memory _auraPoint) public {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");

        Post storage post = userPosts[_userAddress][_postIndex];
        post.auraPointOfThisPost = string(abi.encodePacked(post.auraPointOfThisPost, _auraPoint));

        updateUserVibesAndAuraPoints(_userAddress);
        emit AuraPointUpdated(_userAddress, _postIndex);
    }

    function updateUserVibesAndAuraPoints(address _userAddress) internal {
        User storage user = users[_userAddress];
        user.allVibes = new string[](0) ;
        user.totalAuraPoint = 0;

        for (uint256 i = 0; i < userPosts[_userAddress].length; i++) {
            Post storage post = userPosts[_userAddress][i];
            for (uint256 j = 0; j < post.vibeTagsOfThisPost.length; j++) {
                user.allVibes.push(post.vibeTagsOfThisPost[j]);
            }
            user.totalAuraPoint += parseAuraPoint(post.auraPointOfThisPost);
        }

        user.vibeCount = user.allVibes.length;
        emit AllVibesUpdated(_userAddress);
    }

    function parseAuraPoint(string memory auraPoint) internal pure returns (uint256) {
        return bytes(auraPoint).length;
    }

    function getAllVibesOfUser(address _userAddress) public view returns (string[] memory) {
        User storage user = users[_userAddress];
        require(user.addr != address(0), "User does not exist");
        return user.allVibes;
    }

    function getTotalAuraPointsOfUser(address _userAddress) public view returns (uint256) {
        User storage user = users[_userAddress];
        require(user.addr != address(0), "User does not exist");
        return user.totalAuraPoint;
    }

    function getVibeTagsOfPost(address _userAddress, uint256 _postIndex) public view returns (string[] memory) {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");
        return userPosts[_userAddress][_postIndex].vibeTagsOfThisPost;
    }

    function getAuraPointOfPost(address _userAddress, uint256 _postIndex) public view returns (string memory) {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");
        return userPosts[_userAddress][_postIndex].auraPointOfThisPost;
    }

    function getAllPostsOfUser(address _userAddress) public view returns (Post[] memory) {
        require(users[_userAddress].addr != address(0), "User does not exist");
        return userPosts[_userAddress];
    }

    function getPostByIndex(address _userAddress, uint256 _postIndex) public view returns (Post memory) {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");
        return userPosts[_userAddress][_postIndex];
    }

    function getBasicUserDetails(address _userAddress) public view returns (
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

    function getDetailedUserInfo(address _userAddress) public view returns (
        string memory username,
        string[] memory allVibes,
        uint256 totalAuraPoint,
        uint256 postCount,
        string[] memory customVibeTagsBought,
        string[] memory customVibeTagsAvailableToUse
    ) {
        User storage user = users[_userAddress];
        require(user.addr != address(0), "User does not exist");

        return (
            user.username,
            user.allVibes,
            user.totalAuraPoint,
            userPosts[_userAddress].length,
            user.customVibeTagsBought,
            user.customVibeTagsAvailableToUse
        );
    }

    function getAllUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    function getPostCountForUser(address _userAddress) public view returns (uint256) {
        return userPosts[_userAddress].length;
    }
}
