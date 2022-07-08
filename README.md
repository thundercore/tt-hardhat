# ThunderCore Hardhat Plugin

This repo contains configs and features that aims to standardize and jumpstart your smart contract dev experience on ThunderCore:

- ThunderCore network configurations
- Contract deployment logging

[NPM Package link](https://www.npmjs.com/package/tt-hardhat)

## Usage

```bash
yarn add -D tt-hardhat
```

Then in hardhat.config

```js
import "tt-hardhat";
```

### Features

Networks added

1. thundercore-testnet (chain ID - 18)
1. thundercore-mainnet (chain ID - 108)

Log contracts deployed

```js
// in your deployment file:
import { ethers, network, upgrades, logDeployContracts } from "hardhat";
logDeployContracts(chainId, { [contractName: string]: Contract });
```

## Package development

To start working on your project, just run

```bash
yarn
or
npm install
```

## Plugin development

Read Hardhat's [Plugin Development Guide](https://hardhat.org/advanced/building-plugins.html)

## Testing

(From Hardhat) Running `yarn run test` will run every test located in the `test/` folder. They
use [mocha](https://mochajs.org) and [chai](https://www.chaijs.com/),
but you can customize them.

We recommend creating unit tests for your own modules, and integration tests for
the interaction of the plugin with Hardhat and its dependencies.

## Building the project

Just run `yarn build` ️👷
