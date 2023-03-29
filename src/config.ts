import { NetworkConfig } from "hardhat/types";

const env = {
  privateKey: process.env.KEY !== undefined ? [process.env.KEY] : [],
};

const defaultConfig: Partial<NetworkConfig> = {
  gas: "auto",
  gasMultiplier: 1,
  timeout: 20000,
  httpHeaders: {},
  accounts: env.privateKey,
};

export const thunder = {
  "thunder-testnet": {
    gasPrice: 11e9, // specify gasPrice here since testnet miners tip might be low
    url: "https://testnet-rpc.thundercore.com",
    chainId: 18,
    ...defaultConfig,
  },
  "thunder-mainnet": {
    gasPrice: "auto",
    url: "https://mainnet-rpc.thundercore.com",
    chainId: 108,
    ...defaultConfig,
  },
} as { [networkName: string]: NetworkConfig };
