import { extendConfig, extendEnvironment } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";
import { logDeployContracts } from "./deployLogs";
// import { lazyObject } from "hardhat/plugins";

import "./type-extensions";

dotenv.config();

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const env = {
      privateKey: process.env.KEY !== undefined ? [process.env.KEY] : [],
    };

    const networkConfig = {
      gas: 90000000,
      gasPrice: 1e9,
      gasMultiplier: 1,
      timeout: 20000,
      httpHeaders: {},
      accounts: env.privateKey,
    };

    config.networks = {
      ...userConfig.networks,
      ...config.networks,
      "thunder-testnet": {
        allowUnlimitedContractSize: true,
        url: "https://testnet-rpc.thundercore.com",
        chainId: 18,
        ...networkConfig,
      },
      "thunder-mainnet": {
        allowUnlimitedContractSize: true,
        url: "https://mainnet-rpc.thundercore.com",
        chainId: 108,
        ...networkConfig,
      },
    };
  }
);

extendEnvironment((hre) => {
  // We add a field to the Hardhat Runtime Environment here.
  // We use lazyObject to avoid initializing things until they are actually
  // needed.
  hre.logDeployContracts = logDeployContracts;
});
