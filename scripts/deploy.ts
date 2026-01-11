import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const PharmaChain = await ethers.getContractFactory("PharmaChain");
  const pc = await PharmaChain.deploy();

  await pc.waitForDeployment(); // ✅ FIX
  const address = await pc.getAddress(); // ✅ FIX

  console.log("PharmaChain deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;

main()
  .then(() => process.exit(0)) // ✅ clean exit
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

});
