// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PharmaChain {
    enum Role { NONE, MANUFACTURER, DISTRIBUTOR, RETAILER }
    enum Status { CREATED, IN_TRANSIT, DELIVERED }

    struct Product {
        uint256 id;
        string name;
        address owner;
        Status status;
    }

    mapping(address => Role) public roles;
    mapping(uint256 => Product) public products;
    mapping(uint256 => bool) public productExistsMap;

    address public contractOwner;
    uint256 public nextProductId;

    event ProductRegistered(uint256 indexed id, string name, address indexed owner);
    event OwnershipTransferred(uint256 indexed id, address indexed oldOwner, address indexed newOwner);
    event StatusUpdated(uint256 indexed id, Status status);

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only owner can call this");
        _;
    }

    modifier onlyRole(Role r) {
        require(roles[msg.sender] == r, "Not authorized for this action");
        _;
    }

    modifier onlyProductOwner(uint256 productId) {
        require(products[productId].owner == msg.sender, "Not product owner");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    // Assign role to address
    function assignRole(address account, uint256 role) public onlyOwner {
        require(role <= uint(Role.RETAILER), "Invalid role");
        roles[account] = Role(role);
    }

    // Register a new product
    function registerProduct(string memory name) public onlyRole(Role.MANUFACTURER) {
        uint256 productId = nextProductId;
        require(!productExistsMap[productId], "Product already exists");

        products[productId] = Product({
            id: productId,
            name: name,
            owner: msg.sender,
            status: Status.CREATED
        });
        productExistsMap[productId] = true;

        nextProductId++;

        emit ProductRegistered(productId, name, msg.sender);
    }

    // Transfer product ownership
    function transferOwnership(uint256 productId, address newOwner) public onlyProductOwner(productId) {
        address oldOwner = products[productId].owner;
        products[productId].owner = newOwner;

        emit OwnershipTransferred(productId, oldOwner, newOwner);
    }

    // Update product status
    function updateStatus(uint256 productId, Status newStatus) public {
        Role senderRole = roles[msg.sender];
        require(
            msg.sender == products[productId].owner ||
            senderRole == Role.MANUFACTURER ||
            senderRole == Role.DISTRIBUTOR,
            "Not authorized to update status"
        );

        products[productId].status = newStatus;

        emit StatusUpdated(productId, newStatus);
    }

    // Check if product exists
    function productExists(uint256 productId) public view returns (bool) {
        return productExistsMap[productId];
    }
}
