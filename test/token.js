const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Token", function () {
    let Token;
    let hardhatToken;
    let owner, add1, add2, addrs;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, add1, add2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should assign total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            await hardhatToken.connect(owner).transfer(add1.address, 5);
            const add1Balance = await hardhatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(5);
        });

        it("Should allow user to transfer from their own account using transferFromSelf", async function () {
            await hardhatToken.connect(owner).transfer(add1.address, 10);
            await hardhatToken.connect(add1).transferFromSelf(add1.address, add2.address, 5);
            const add2Balance = await hardhatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(5);
        });
    });
});
