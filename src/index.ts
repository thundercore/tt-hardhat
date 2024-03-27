import { extendConfig, extendEnvironment } from "hardhat/config";
import {
  HardhatConfig,
  HardhatUserConfig,
  MultiSolcUserConfig,
  SolcUserConfig,
} from "hardhat/types";
import * as dotenv from "dotenv";
import logDeployContracts from "./deployLogs";
import { thunder } from "./config";
// import { lazyObject } from "hardhat/plugins";
// import * as util from "util";

const thunderCoreEvmTarget = "london";

import "./type-extensions";

dotenv.config();

const warnEnvKey = () => {
  console.warn(
    "tt-hardhat: create a .env file with your private key: KEY=0x..."
  );
};

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    // console.warn(
    //   "Pre userConfig.solidity:",
    //   util.inspect(userConfig.solidity, { depth: 4 })
    // );

    try {
      if (process.env.KEY === undefined) {
        console.warn("process.env.KEY undefined");
        warnEnvKey();
      } else if (!process.env.KEY.startsWith("0x")) {
        console.warn("process.env.KEY does not start with 0x");
        warnEnvKey();
      }
    } catch (e) {
      console.warn("process.env.KEY test raised exception:", e);
    }

    config.networks = {
      ...thunder,
      ...config.networks,
    };

    // userConfig.solidity is of type SolidityUserConfig.
    // It can't be undefined.
    //
    // type SolidityUserConfig =
    //   | string
    //   | SolcUserConfig
    //   | MultiSolcUserConfig;

    // interface SolcUserConfig {
    //   version: string;
    //   settings?: any;
    // }

    // interface MultiSolcUserConfig {
    //   compilers: SolcUserConfig[];
    //   overrides?: Record<string, SolcUserConfig>;
    // }

    let solcOverrideEvmTargetForVersion = {} as Record<string, boolean>; // solcVer -> setEvmVersion
    if (
      userConfig.solidity === undefined ||
      typeof userConfig.solidity === "string"
    ) {
      const v = userConfig.solidity as string;
      solcOverrideEvmTargetForVersion[v] = true;
    } else {
      // ether has `settings` object or `compilers` list under `userConfig.solidity`
      const sC = userConfig.solidity as SolcUserConfig;
      if (sC.version !== undefined) {
        // `userConfig.solidity` is actually in `SolcUserConfig` form
        if (sC?.settings?.evmVersion === undefined) {
          solcOverrideEvmTargetForVersion[sC.version] = true;
        }
      } else {
        // Record which compiler versions to override
        const mC = userConfig.solidity as MultiSolcUserConfig;
        for (const c of mC.compilers) {
          if (c.settings?.emVersion === undefined) {
            solcOverrideEvmTargetForVersion[c.version] = true;
          }
        }
      }
    }

    for (const c of config.solidity.compilers) {
      if (solcOverrideEvmTargetForVersion[c.version]) {
        c.settings.evmVersion = thunderCoreEvmTarget;
      }
    }
    // console.warn(
    //   "Post config.solidity:",
    //   util.inspect(config.solidity, { depth: 4 })
    // );
  }
);

extendEnvironment((hre) => {
  // We add a field to th, userConfig: Readonly<HardhatUserConfig>e Hardhat Runtime Environment here.
  // We use lazyObject to avoid initializing things until they are actually
  // needed.
  hre.logDeployContracts = logDeployContracts;
});
