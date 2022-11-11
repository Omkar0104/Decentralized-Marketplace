const hre = require("hardhat");
async function main() {
  const BasicMarketPlace = await hre.ethers.getContractFactory(
    "BasicMarketPlace"
  );

  const basicMarketPlace = await BasicMarketPlace.deploy();
  await basicMarketPlace.deployed();
  console.log(" BasicMarketPlace deployed to:" + basicMarketPlace.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
