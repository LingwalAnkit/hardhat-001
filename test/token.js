const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Token", function () {
    let Token;
    let hardhatToken;
    let add1;
    let add2;
    let adds;
    let owner;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, add1, add2, ...adds] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });

    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        const totalSupply = await hardhatToken.totalSupply();
        expect(ownerBalance).to.equal(totalSupply);
    });
});
