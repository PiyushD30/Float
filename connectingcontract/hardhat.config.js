require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './artifacts', // Make sure this path is correct
  },
  networks: {
    hardhat: {
      gas: 8000000, // Adjust the gas limit as needed
    },
  },
};
