// pragma solidity >=0.7.0 <0.9.0;

// contract Upload {

//   struct Access{
//      address user;
//      bool access; //true or false
//   }
//   mapping(address=>string[]) value;
//   mapping(address=>mapping(address=>bool)) ownership;
//   mapping(address=>Access[]) accessList;
//   mapping(address=>mapping(address=>bool)) previousData;

//   function add(address _user,string memory url) external {
//       value[_user].push(url);
//   }
//   function allow(address user) external {//def
//       ownership[msg.sender][user]=true;
//       if(previousData[msg.sender][user]){
//          for(uint i=0;i<accessList[msg.sender].length;i++){
//              if(accessList[msg.sender][i].user==user){
//                   accessList[msg.sender][i].access=true;
//              }
//          }
//       }else{
//           accessList[msg.sender].push(Access(user,true));
//           previousData[msg.sender][user]=true;
//       }

//   }
//   function disallow(address user) public{
//       ownership[msg.sender][user]=false;
//       for(uint i=0;i<accessList[msg.sender].length;i++){
//           if(accessList[msg.sender][i].user==user){
//               accessList[msg.sender][i].access=false;
//           }
//       }
//   }

//   function display(address _user) external view returns(string[] memory){
//       require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
//       return value[_user];
//   }

//   function shareAccess() public view returns(Access[] memory){
//       return accessList[msg.sender];
//   }
// }

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct File {
        string url; // IPFS Hash (CID)
        string fileType; // MIME type (e.g., "image/png", "application/pdf")
        bool isFolder; // True if it's a folder
    }

    struct Access {
        address user;
        bool access; // true = granted, false = revoked
    }

    mapping(address => File[]) private userFiles;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) private previousData;

    // Function to add a file or folder
    function add(
        address _user,
        string memory url,
        string memory fileType,
        bool isFolder
    ) external {
        userFiles[_user].push(File(url, fileType, isFolder));
    }

    // Grant access to another user
    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    // Revoke access from another user
    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    // Function to retrieve files uploaded by a user
    function display(address _user) external view returns (File[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return userFiles[_user];
    }

    // Function to check shared access
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
