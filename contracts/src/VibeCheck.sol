// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VibeCheck {
    struct User {
        string username;
        address addr;
        string[] allVibes;
        uint256 vibeCount;
        string[] auraPoints;
        uint256 totoalAuraPoint;
        int256 gyaatLevel;
        Post[] posts;
        string[] customVibeTagsBrought;
        string[] customVibeTagsAvaiableToUse;
    }

    struct Post {
        string postURL;
        string[] vibesTagOfThisPost;
        string auraPointOfThisPost;
    }

    User[] public users;

    // function createPost(string memory _postURL) external {
    //     Post memory newPost = Post(_postURL, new string[](0), "");
    //     users.push.push(newPost);
    //     // emit a event
    // }

    // function createUser(string memory _username, address _addr) external {
    //     User memory newUser = User(_username, _addr, new string[](0), 0, new string[](0), 0, 0, new Post[](0), new string[](0), new string[](0));
    //     users.push(newUser);
    //     // create a event
    // }


}
