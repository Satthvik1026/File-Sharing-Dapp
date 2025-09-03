require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env;

if (!process.env.SEPOLIA_RPC_URL || !process.env.PRIVATE_KEY) {
  throw new Error("⚠️ Missing SEPOLIA_RPC_URL or PRIVATE_KEY in .env file");
}
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
