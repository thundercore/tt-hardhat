import { ethers, logDeployContracts, network } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  logDeployContracts(network.config.chainId, { Greeter: greeter });
  const deployedPath = path.join(
    __dirname,
    "..",
    `contracts-deployed/${network.config.chainId}-logs.json`
  );
  if (!fs.existsSync(deployedPath)) {
    throw new Error(
      "logDeployContracts: did not create the contracts-deployed directory"
    );
  }

  // wait for file writing
  await new Promise((resolve) => setTimeout(resolve, 500));

  const file = fs.readFileSync(deployedPath, "utf8");
  const data = JSON.parse(file);

  if (
    Object.keys(data)[0] !== "Greeter" ||
    Object.values(data)[0] !== greeter.address
  ) {
    throw new Error("logDeployContracts: wrong data");
  }
  console.log("deploy success");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
