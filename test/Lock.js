const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LandRegistry", function () {
    let LandRegistry;
    let landRegistry;
    let owner, addr1, addr2;

    // Deploy the contract before each test
    beforeEach(async function () {
        LandRegistry = await ethers.getContractFactory("LandRegistry");
        [owner, addr1, addr2] = await ethers.getSigners();
        landRegistry = await LandRegistry.deploy();
        await landRegistry.deployed();
    });

    describe("Land Registration", function () {
        it("Should register a land with correct details", async function () {
            await landRegistry.registerLand("123 Main St", 1000, "hash123");

            const land = await landRegistry.lands(1);
            expect(land.location).to.equal("123 Main St");
            expect(land.size).to.equal(1000);
            expect(land.owner).to.equal(owner.address);
            expect(land.documentHash).to.equal("hash123");
        });

        it("Should revert if the location is already registered", async function () {
            await landRegistry.registerLand("123 Main St", 1000, "hash123");
            await expect(
                landRegistry.registerLand("123 Main St", 2000, "hash456")
            ).to.be.revertedWith("Land already registered");
        });
    });

    describe("Land Transfer", function () {
        beforeEach(async function () {
            await landRegistry.registerLand("123 Main St", 1000, "hash123");
        });

        it("Should transfer land ownership", async function () {
            await landRegistry.transferLand(1, addr1.address);
            const land = await landRegistry.lands(1);
            expect(land.owner).to.equal(addr1.address);
        });

        it("Should revert if non-owner tries to transfer land", async function () {
            await expect(
                landRegistry.connect(addr1).transferLand(1, addr2.address)
            ).to.be.revertedWith("Only the owner can transfer the land");
        });
    });

    describe("Land Sale", function () {
        beforeEach(async function () {
            await landRegistry.registerLand("123 Main St", 1000, "hash123");
        });

        it("Should set the land for sale and update the price", async function () {
            await landRegistry.setForSale(1, ethers.utils.parseEther("1"));
            const land = await landRegistry.lands(1);
            expect(land.forSale).to.equal(true);
            expect(land.price).to.equal(ethers.utils.parseEther("1"));
        });

        it("Should revert if non-owner tries to set land for sale", async function () {
            await expect(
                landRegistry.connect(addr1).setForSale(1, ethers.utils.parseEther("1"))
            ).to.be.revertedWith("Only the owner can set the land for sale");
        });

        it("Should allow the purchase of land", async function () {
            await landRegistry.setForSale(1, ethers.utils.parseEther("1"));
            const tx = await landRegistry.connect(addr1).purchaseLand(1, {
                value: ethers.utils.parseEther("1"),
            });
            await tx.wait();

            const land = await landRegistry.lands(1);
            expect(land.owner).to.equal(addr1.address);
            expect(land.forSale).to.equal(false);
        });

        it("Should revert if the incorrect price is sent", async function () {
            await landRegistry.setForSale(1, ethers.utils.parseEther("1"));
            await expect(
                landRegistry.connect(addr1).purchaseLand(1, {
                    value: ethers.utils.parseEther("0.5"),
                })
            ).to.be.revertedWith("Incorrect price");
        });
    });

    describe("Document Verification", function () {
        beforeEach(async function () {
            await landRegistry.registerLand("123 Main St", 1000, "hash123");
        });

        it("Should verify the document hash correctly", async function () {
            const result = await landRegistry.verifyDocument(1, "hash123");
            expect(result).to.equal(true);
        });

        it("Should return false for incorrect document hash", async function () {
            const result = await landRegistry.verifyDocument(1, "wrongHash");
            expect(result).to.equal(false);
        });
    });
});