import * as fs from "fs";
import path from "path";
import { BaseContract } from "ethers";
import { BaseProvider, TransactionReceipt } from "@ethersproject/providers";

function writeFile(filePath: string, data: any) {
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      throw err;
    }
  });
}

function createDirIfNone(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function getCommitHash() {
  return require("child_process")
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim();
}

function logVerbose(
  filePath: string,
  contracts: { [contractName: string]: BaseContract },
  receipts: { [contractName: string]: TransactionReceipt }
) {
  const timestamp = new Date().getTime();
  const commitHash = getCommitHash();

  const info = Object.keys(contracts).reduce(
    (accu, cur) => ({
      ...accu,
      [cur]: {
        address: contracts[cur].address,
        commitHash,
        transaction: {
          hash: contracts[cur].deployTransaction.hash,
          blockNumber: receipts[cur].blockNumber,
          gasLimit: contracts[cur].deployTransaction.gasLimit,
          gasPrice: contracts[cur].deployTransaction.gasPrice,
        },
      },
    }),
    {}
  );

  const datedInfo = {
    [timestamp]: info,
  };

  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.message.includes("no such file or directory")) {
        writeFile(filePath, JSON.stringify(datedInfo));
        return;
      } else {
        throw err;
      }
    }

    let json = JSON.parse(data.toString());
    json = { ...datedInfo, ...json };

    writeFile(filePath, JSON.stringify(json));
  });
}

function writeBaseLog(
  filePath: string,
  contracts: { [contractName: string]: BaseContract }
) {
  const data = Object.keys(contracts).reduce((accu, cur) => {
    return {
      ...accu,
      [cur]: contracts[cur].address,
    };
  }, {});
  writeFile(filePath, JSON.stringify(data));
}
async function getReceipts(
  provider: BaseProvider,
  contracts: { [contractName: string]: BaseContract }
): Promise<{ [contractName: string]: TransactionReceipt }> {
  const sortedReceipts = await Promise.all(
    Object.keys(contracts).map((contractName) =>
      provider.getTransactionReceipt(
        contracts[contractName].deployTransaction.hash
      )
    )
  );
  const receipts = Object.keys(contracts).reduce(
    (accu, cur, index) => ({
      ...accu,
      [cur]: sortedReceipts[index],
    }),
    {}
  );
  return receipts;
}

async function main(
  chainId: number | undefined,
  provider: BaseProvider,
  contracts: { [contractName: string]: BaseContract }
) {
  if (!chainId) throw new Error("no chainID");
  const basePath = path.join(process.cwd(), "contracts-deployed");

  createDirIfNone(basePath);

  const filePath = path.join(basePath, `/${chainId}-logs.json`);
  writeBaseLog(filePath, contracts);

  const verboseDir = path.join(process.cwd(), "contracts-deployed/verbose");
  const verbosePath = path.join(verboseDir, `/${chainId}-logs.json`);
  createDirIfNone(verboseDir);

  const receipts = await getReceipts(provider, contracts);

  logVerbose(verbosePath, contracts, receipts);

  console.log("Contracts logged in contracts-deployed\n");
}

export default main;
