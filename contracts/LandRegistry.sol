// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        string location;
        uint256 size;
        address owner;
        string documentHash;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    event LandRegistered(uint256 indexed landId, string location, uint256 size, address indexed owner, string documentHash);
    event LandTransferred(uint256 indexed landId, address indexed newOwner);

    function registerLand(string memory _location, uint256 _size, string memory _documentHash) public {
        require(bytes(_location).length > 0, "Location is required");
        require(_size > 0, "Size must be greater than zero");
        require(bytes(_documentHash).length > 0, "Document hash is required");

        lands[landCount] = Land(_location, _size, msg.sender, _documentHash);
        emit LandRegistered(landCount, _location, _size, msg.sender, _documentHash);
        landCount++;
    }

    function transferLand(uint256 _landId, address _newOwner) public {
        require(_landId < landCount, "Land does not exist");
        require(msg.sender == lands[_landId].owner, "Only the owner can transfer the land");
        require(_newOwner != address(0), "Invalid new owner address");

        lands[_landId].owner = _newOwner;
        emit LandTransferred(_landId, _newOwner);
    }

    function verifyDocument(uint256 _landId, string memory _documentHash) public view returns (bool) {
        require(_landId < landCount, "Land does not exist");
        return keccak256(abi.encodePacked(lands[_landId].documentHash)) == keccak256(abi.encodePacked(_documentHash));
    }
}
