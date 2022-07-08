import * as fs from "fs";
import path from "path";

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

function logVerbose(
  filePath: string,
  contracts: { [contractName: string]: any }
) {
  const timestamp = new Date().getTime();
  const info = Object.keys(contracts).reduce(
    (accu, cur) => ({
      ...accu,
      [cur]: {
        address: contracts[cur].address,
        transaction: {
          hash: contracts[cur].deployTransaction.hash,
          blockNumber: contracts[cur].deployTransaction.blockNumber,
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
  contracts: { [contractName: string]: any }
) {
  const data = Object.keys(contracts).reduce((accu, cur) => {
    return {
      ...accu,
      [cur]: contracts[cur].address,
    };
  }, {});
  writeFile(filePath, JSON.stringify(data));
}

export function logDeployContracts(
  chainId: number | undefined,
  contracts: { [contractName: string]: any }
) {
  if (!chainId) throw new Error("no chainID");
  const basePath = path.join(process.cwd(), "contracts-deployed");

  createDirIfNone(basePath);

  const filePath = path.join(basePath, `/${chainId}-logs.json`);
  writeBaseLog(filePath, contracts);

  const verboseDir = path.join(process.cwd(), "contracts-deployed/verbose");
  const verbosePath = path.join(verboseDir, `/${chainId}-logs.json`);
  createDirIfNone(verboseDir);

  logVerbose(verbosePath, contracts);

  console.log("Contracts logged in contracts-deployed\n");
}
