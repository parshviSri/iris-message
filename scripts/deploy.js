
const hre = require("hardhat");

async function main() {
  const Iris = await hre.ethers.getContractFactory("Iris");
  const iris = await Iris.deploy();

  await iris.deployed();

  console.log(
   'Iris is deployed to:',iris.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
