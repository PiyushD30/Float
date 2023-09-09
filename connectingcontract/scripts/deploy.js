const hre = require("hardhat");

async function main() {
  const lockedAmount = hre.ethers.parseEther("0.001");

  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");

const deploymentOptions = {
  gasLimit: 2000000, // Adjust the gas limit as needed
};

const nftMarketplace = await NFTMarketplace.deploy(deploymentOptions);


  await nftMarketplace.deployed();

  console.log(`Contract address: ${nftMarketplace.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
