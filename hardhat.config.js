
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const {SEPOLIA_URL, SECRET_KEY} = process.env;
module.exports = {
  solidity: "0.8.24",
  network: {
    sepolia: {
      url: SEPOLIA_URL || "",
      accounts: 
        SECRET_KEY !== undefined ? [SECRET_KEY] : []
    }
  }
};
