// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PharmaChain {

    // =========================
    // ENUMS
    // =========================
    enum Role { NONE, MANUFACTURER, DISTRIBUTOR, RETAILER }
    enum Status { REGISTERED, DISTRIBUTED, RETAILING, SOLD }

    uint256 public constant DISTRIBUTOR_TIME_LIMIT = 4 days;

    // =========================
    // STRUCT
    // =========================
    struct Product {
        uint256 id;
        string name;
        address owner;
        Status status;

        uint256 registeredAt;
        uint256 distributedAt;
        uint256 retailingAt;
        uint256 soldAt;

        uint256 lastTransferAt;
    }

    // =========================
    // STORAGE
    // =========================
    mapping(address => Role) public roles;
    mapping(uint256 => Product) public products;
    mapping(uint256 => bool) public productExistsMap;

    address public contractOwner;
    uint256 public nextProductId;

    // =========================
    // EVENTS
    // =========================
    event ProductRegistered(
        uint256 indexed id,
        string name,
        address indexed owner,
        uint256 time
    );

    event OwnershipTransferred(
        uint256 indexed id,
        address indexed oldOwner,
        address indexed newOwner,
        uint256 time
    );

    event StatusUpdated(
        uint256 indexed id,
        Status status,
        uint256 time
    );

    // =========================
    // MODIFIERS
    // =========================
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only owner");
        _;
    }

    modifier onlyRole(Role r) {
        require(roles[msg.sender] == r, "Unauthorized role");
        _;
    }

    modifier productExists(uint256 productId) {
        require(productExistsMap[productId], "Product does not exist");
        _;
    }

    modifier onlyProductOwner(uint256 productId) {
        require(products[productId].owner == msg.sender, "Not product owner");
        _;
    }

    // =========================
    // CONSTRUCTOR
    // =========================
    constructor() {
        contractOwner = msg.sender;
    }

    // =========================
    // ROLE MANAGEMENT
    // =========================
    function assignRole(address account, uint256 role)
        external
        onlyOwner
    {
        require(role <= uint(Role.RETAILER), "Invalid role");
        roles[account] = Role(role);
    }

    // =========================
    // REGISTER PRODUCT
    // =========================
    function registerProduct(string calldata name)
        external
        onlyRole(Role.MANUFACTURER)
    {
        uint256 productId = nextProductId;

        products[productId] = Product({
            id: productId,
            name: name,
            owner: msg.sender,
            status: Status.REGISTERED,

            registeredAt: block.timestamp,
            distributedAt: 0,
            retailingAt: 0,
            soldAt: 0,

            lastTransferAt: block.timestamp
        });

        productExistsMap[productId] = true;
        nextProductId++;

        emit ProductRegistered(productId, name, msg.sender, block.timestamp);
    }

    // =========================
    // TRANSFER OWNERSHIP
    // =========================
    function transferOwnership(uint256 productId, address newOwner)
        external
        productExists(productId)
        onlyProductOwner(productId)
    {
        Product storage p = products[productId];
        Role senderRole = roles[msg.sender];
        Role receiverRole = roles[newOwner];

        require(receiverRole != Role.NONE, "Receiver must have a role");

        // ---- ROLE FLOW ENFORCEMENT ----
        if (senderRole == Role.MANUFACTURER) {
            require(receiverRole == Role.DISTRIBUTOR, "Manufacturer -> Distributor only");
        } else if (senderRole == Role.DISTRIBUTOR) {
            require(receiverRole == Role.RETAILER, "Distributor -> Retailer only");

            // ⛔ Distributor 4-day limit
            require(
                block.timestamp <= p.lastTransferAt + DISTRIBUTOR_TIME_LIMIT,
                "Distributor transfer time expired"
            );
        } else {
            revert("Invalid role for transfer");
        }

        address oldOwner = p.owner;
        p.owner = newOwner;
        p.lastTransferAt = block.timestamp;

        // ---- AUTO STATUS UPDATE ----
        if (p.status == Status.REGISTERED) {
            p.status = Status.DISTRIBUTED;
            p.distributedAt = block.timestamp;
        } else if (p.status == Status.DISTRIBUTED) {
            p.status = Status.RETAILING;
            p.retailingAt = block.timestamp;
        }

        emit OwnershipTransferred(productId, oldOwner, newOwner, block.timestamp);
        emit StatusUpdated(productId, p.status, block.timestamp);
    }

    // =========================
    // SELL PRODUCT (FINAL STEP)
    // =========================
    function sellProduct(uint256 productId, address buyer)
        external
        productExists(productId)
        onlyRole(Role.RETAILER)
        onlyProductOwner(productId)
    {
        Product storage p = products[productId];

        require(p.status == Status.RETAILING, "Not ready for sale");

        address oldOwner = p.owner;
        p.owner = buyer;
        p.status = Status.SOLD;
        p.soldAt = block.timestamp;

        emit OwnershipTransferred(productId, oldOwner, buyer, block.timestamp);
        emit StatusUpdated(productId, Status.SOLD, block.timestamp);
    }
}
