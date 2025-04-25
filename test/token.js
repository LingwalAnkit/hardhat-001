const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Token", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners(); // ✅ FIXED
        console.log("Signers Object", owner);

        const Token = await ethers.getContractFactory("Token"); 
        // Looks for a contract named "Token" inside your contracts/ folder. forms connection between the contract and the token.js file 
        const hardhatToken = await Token.deploy();

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        console.log("Owner address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});
