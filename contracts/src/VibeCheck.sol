// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VibeCheck {
    struct Post {
        string postURL;
        string[] vibeTagsOfThisPost;
        uint256 auraPointOfThisPost;
    }

    struct User {
        string username;
        address addr;
        string[] allVibes;
        uint256 vibeCount;
        uint256[] auraPoints;
        uint256 totalAuraPoint;
        int256 gyaatLevel;
        string[] customVibeTagsBought;
        string[] customVibeTagsAvailableToUse;
        bool hasPet;
    }

    mapping(address => User) public users;
    mapping(address => Post[]) public userPosts;
    address[] public userAddresses;

    event UserCreated(address indexed userAddress, string username);
    event PostAdded(address indexed userAddress, uint256 indexed postIndex);
    event VibeTagsUpdated(address indexed userAddress, uint256 indexed postIndex);
    event AuraPointUpdated(address indexed userAddress, uint256 indexed postIndex, uint256 auraPoint);
    event CustomVibeTagsBoughtUpdated(address indexed userAddress);
    event CustomVibeTagsAvailableToUseUpdated(address indexed userAddress);
    event AllVibesUpdated(address indexed userAddress);
    event TotalAuraPointUpdated(address indexed userAddress, uint256 totalAuraPoint);
    event AuraPointsPurchased(address indexed userAddress, uint256 auraPoints);
    event PetPurchased(address indexed userAddress);

    function createUser(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(users[msg.sender].addr == address(0), "User already exists");

        User storage newUser = users[msg.sender];
        newUser.username = _username;
        newUser.addr = msg.sender;
        newUser.allVibes = new string[](0) ;
        newUser.auraPoints = new uint256[](0) ;
        newUser.customVibeTagsBought = new string[](0) ;
        newUser.customVibeTagsAvailableToUse = new string[](0);
        newUser.vibeCount = 0;
        newUser.totalAuraPoint = 0;
        newUser.gyaatLevel = 0;
        newUser.hasPet = false;

        userAddresses.push(msg.sender);
        emit UserCreated(msg.sender, _username);
    }

    function addPost(string memory _postURL) public {
        require(users[msg.sender].addr != address(0), "User does not exist");
        require(bytes(_postURL).length > 0, "Post URL cannot be empty");

        Post memory newPost = Post({
            postURL: _postURL,
            vibeTagsOfThisPost: new string[](0) ,
            auraPointOfThisPost: 0
        });

        userPosts[msg.sender].push(newPost);
        emit PostAdded(msg.sender, userPosts[msg.sender].length - 1);
    }

    function getAllPosts() public view returns (Post[] memory allPosts) {
        uint256 totalPostCount = 0;

        for (uint256 i = 0; i < userAddresses.length; i++) {
            totalPostCount += userPosts[userAddresses[i]].length;
        }

        allPosts = new Post[](totalPostCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < userAddresses.length; i++) {
            for (uint256 j = 0; j < userPosts[userAddresses[i]].length; j++) {
                allPosts[currentIndex] = userPosts[userAddresses[i]][j];
                currentIndex++;
            }
        }
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

    function buyAuraPoints(uint256 _auraPoints) public payable {
        require(users[msg.sender].addr != address(0), "User does not exist");
        require(msg.value >= _auraPoints * 0.01 ether, "Insufficient payment for aura points");

        (bool callSuccess, ) = payable(address(this)).call{value: msg.value}("");
        require(callSuccess, "Payment failed");

        User storage user = users[msg.sender];
        user.totalAuraPoint += _auraPoints;
        user.auraPoints.push(_auraPoints);

        emit AuraPointsPurchased(msg.sender, _auraPoints);
        emit TotalAuraPointUpdated(msg.sender, user.totalAuraPoint);
    }

    function buyPet() public payable {
        require(users[msg.sender].addr != address(0), "User does not exist");
        require(!users[msg.sender].hasPet, "User already owns a pet");
        require(msg.value >= 0.1 ether, "Insufficient payment for buying a pet");

        (bool callSuccess, ) = payable(address(this)).call{value: msg.value}("");
        require(callSuccess, "Payment failed");

        users[msg.sender].hasPet = true;

        emit PetPurchased(msg.sender);
    }

    function setAuraPointOfPost(address _userAddress, uint256 _postIndex, uint256 _auraPoint) public {
        require(_postIndex < userPosts[_userAddress].length, "Post index out of range");

        Post storage post = userPosts[_userAddress][_postIndex];
        post.auraPointOfThisPost += _auraPoint;

        updateUserVibesAndAuraPoints(_userAddress);
        emit AuraPointUpdated(_userAddress, _postIndex, post.auraPointOfThisPost);
    }

    function updateUserVibesAndAuraPoints(address _userAddress) internal {
        User storage user = users[_userAddress];
        user.allVibes = new string[](0);
        user.totalAuraPoint = 0;

        for (uint256 i = 0; i < userPosts[_userAddress].length; i++) {
            Post storage post = userPosts[_userAddress][i];

            for (uint256 j = 0; j < post.vibeTagsOfThisPost.length; j++) {
                user.allVibes.push(post.vibeTagsOfThisPost[j]);
            }

            user.totalAuraPoint += post.auraPointOfThisPost;
        }

        user.vibeCount = user.allVibes.length;
        emit AllVibesUpdated(_userAddress);
        emit TotalAuraPointUpdated(_userAddress, user.totalAuraPoint);
    }

    function getUserDetails(address _userAddress) public view returns (
        string memory username,
        uint256 vibeCount,
        uint256 totalAuraPoint,
        int256 gyaatLevel,
        uint256 postCount,
        bool hasPet
    ) {
        User storage user = users[_userAddress];
        require(user.addr != address(0), "User does not exist");

        return (
            user.username,
            user.vibeCount,
            user.totalAuraPoint,
            user.gyaatLevel,
            userPosts[_userAddress].length,
            user.hasPet
        );
    }

    function getAllUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    function getTotalAuraPointsOfUser(address _userAddress) public view returns (uint256) {
        return users[_userAddress].totalAuraPoint;
    }
}
