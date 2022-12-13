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

### Config

account: KEY=\$PRIVATE_KEY in your .env file

### Features

Networks added

1. thundercore-testnet (chain ID - 18)
1. thundercore-mainnet (chain ID - 108)

Use deploy account for the above networks: simply add a KEY environment variable

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

## Publish

`yarn publish` make sure to `yarn login` if you haven't

## Testing

(From Hardhat) Running `yarn run test` will run every test located in the `test/` folder.

### Testing package on project

1. run `yarn link` in root
2. cd into `test/project`, then run `yarn link tt-hardhat` to link to local package
3. if package's code is changed, run `yarn build` to rebuild the package
4. do tests...
5. after testing, run `yarn unlink tt-hardhat` in test/project, then `yarn unlink` in root.

## Building the project

Just run `yarn build` ️👷
