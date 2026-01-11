const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PharmaChain Phase 1.1", function () {
    let pharmachain;
    let owner, manufacturer, distributor, retailer, other;
    const ROLES = { NONE: 0, MANUFACTURER: 1, DISTRIBUTOR: 2, RETAILER: 3 };
    const STATUS = { CREATED: 0, IN_TRANSIT: 1, DELIVERED: 2 };

    beforeEach(async () => {
        [owner, manufacturer, distributor, retailer, other] = await ethers.getSigners();

        const PharmaChain = await ethers.getContractFactory("PharmaChain");
        pharmachain = await PharmaChain.deploy();
        await pharmachain.deployed();

        // Assign roles
        await pharmachain.assignRole(manufacturer.address, ROLES.MANUFACTURER);
        await pharmachain.assignRole(distributor.address, ROLES.DISTRIBUTOR);

        // Register product
        await pharmachain.connect(manufacturer).registerProduct("Paracetamol");
    });

    it("Product owner can transfer ownership", async () => {
        await expect(pharmachain.connect(manufacturer).transferOwnership(0, distributor.address))
            .to.emit(pharmachain, "OwnershipTransferred")
            .withArgs(0, manufacturer.address, distributor.address);
    });

    it("Cannot transfer ownership if not current owner", async () => {
        await expect(pharmachain.connect(distributor).transferOwnership(0, retailer.address))
            .to.be.revertedWith("Not product owner");
    });

    it("Owner, manufacturer, or current owner can update product status", async () => {
        await expect(pharmachain.connect(distributor).updateStatus(0, STATUS.IN_TRANSIT))
            .to.emit(pharmachain, "StatusUpdated")
            .withArgs(0, STATUS.IN_TRANSIT);
    });
});
