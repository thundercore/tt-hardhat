import { extendConfig, extendEnvironment } from "hardhat/config";
import { HardhatConfig } from "hardhat/types";
import * as dotenv from "dotenv";
import logDeployContracts from "./deployLogs";
import { thunder } from "./config";
// import { lazyObject } from "hardhat/plugins";

import "./type-extensions";

dotenv.config();

extendConfig((config: HardhatConfig) => {
  config.networks = {
    ...config.networks,
    ...thunder,
  };
});

extendEnvironment((hre) => {
  // We add a field to th, userConfig: Readonly<HardhatUserConfig>e Hardhat Runtime Environment here.
  // We use lazyObject to avoid initializing things until they are actually
  // needed.
  hre.logDeployContracts = logDeployContracts;
});
