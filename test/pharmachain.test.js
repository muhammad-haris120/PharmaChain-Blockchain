const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PharmaChain - Phase 1 Tests", function () {
    let pharmachain;
    let owner, manufacturer, distributor, retailer, other;
    const ROLES = { NONE: 0, MANUFACTURER: 1, DISTRIBUTOR: 2, RETAILER: 3 };

    beforeEach(async () => {
        [owner, manufacturer, distributor, retailer, other] = await ethers.getSigners();

        const PharmaChain = await ethers.getContractFactory("PharmaChain");
        pharmachain = await PharmaChain.deploy();
        await pharmachain.deployed();

        // Assign roles
        await pharmachain.assignRole(manufacturer.address, ROLES.MANUFACTURER);
        await pharmachain.assignRole(distributor.address, ROLES.DISTRIBUTOR);
        await pharmachain.assignRole(retailer.address, ROLES.RETAILER);
    });

    it("Manufacturer can register a product", async () => {
        await expect(pharmachain.connect(manufacturer).registerProduct("Paracetamol"))
            .to.emit(pharmachain, "ProductRegistered")
            .withArgs(0, "Paracetamol", manufacturer.address);
    });

    it("Manufacturer cannot register the same product twice", async () => {
        await pharmachain.connect(manufacturer).registerProduct("Paracetamol");
        await expect(pharmachain.connect(manufacturer).registerProduct("Paracetamol"))
            .to.be.revertedWith("Product already exists");
    });

    it("Should not allow unauthorized users to register products", async () => {
        await expect(pharmachain.connect(other).registerProduct("Ibuprofen"))
            .to.be.revertedWith("Not authorized for this action");
    });
});
