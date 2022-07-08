import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "solidity-coverage";
import "thundercore-hardhat";

dotenv.config();

const env = {
  privateKey: process.env.KEY !== undefined ? [process.env.KEY] : [],
  etherscanApiKey: process.env.ETHERSCAN_API_KEY,
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "london",
    },
  },
};

export default config;
