require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // <-- Important

const { SEPOLIA_API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
