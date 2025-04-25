// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Get the deployer account
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with account:", deployer.address);

    // Get the Token contract factory
    const Token = await ethers.getContractFactory("Token");
    console.log("Deploying Token...");
    const token = await Token.deploy();
    console.log("✅ Token deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Error deploying:", error);
        process.exit(1);
    });
