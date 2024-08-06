// contracts/LandRegistry.sol
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint id;
        string location;
        uint size;
        address owner;
        bool forSale;
        uint price;
        string documentHash;
    }

    mapping(uint => Land) public lands;
    mapping(string => bool) private registeredLocations;
    uint public landCount;

    event LandRegistered(uint id, string location, uint size, address owner, string documentHash);
    event LandTransferred(uint id, address newOwner);
    event LandForSale(uint id, bool forSale, uint price);
    event LandPurchased(uint id, address newOwner);

    function registerLand(string memory _location, uint _size, string memory _documentHash) public {
        require(!registeredLocations[_location], "Land already registered");
        landCount++;
        lands[landCount] = Land(landCount, _location, _size, msg.sender, false, 0, _documentHash);
        registeredLocations[_location] = true;
        emit LandRegistered(landCount, _location, _size, msg.sender, _documentHash);
    }

    function transferLand(uint _id, address _newOwner) public {
        require(lands[_id].owner == msg.sender, "Only the owner can transfer the land");
        lands[_id].owner = _newOwner;
        emit LandTransferred(_id, _newOwner);
    }

    function setForSale(uint _id, uint _price) public {
        require(lands[_id].owner == msg.sender, "Only the owner can set the land for sale");
        lands[_id].forSale = true;
        lands[_id].price = _price;
        emit LandForSale(_id, true, _price);
    }

    function purchaseLand(uint _id) public payable {
        require(lands[_id].forSale, "Land is not for sale");
        require(msg.value == lands[_id].price, "Incorrect price");
        address previousOwner = lands[_id].owner;
        lands[_id].owner = msg.sender;
        lands[_id].forSale = false;
        payable(previousOwner).transfer(msg.value);
        emit LandPurchased(_id, msg.sender);
    }

    function verifyDocument(uint _id, string memory _documentHash) public view returns (bool) {
        return keccak256(abi.encodePacked(lands[_id].documentHash)) == keccak256(abi.encodePacked(_documentHash));
    }
}

