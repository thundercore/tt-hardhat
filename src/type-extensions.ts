import { BaseProvider } from "@ethersproject/providers";
// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    logDeployContracts: (
      chainId: number | undefined,
      contracts: {
        [contractName: string]: any;
      }
    ) => void;
  }
}
