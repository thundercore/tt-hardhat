import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "tt-hardhat";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
