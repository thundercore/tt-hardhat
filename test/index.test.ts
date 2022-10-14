// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";

import { logDeployContracts } from "./deployLogs";

import { useEnvironment } from "./helpers";

describe("thundercore hardhat tests", function () {
  // describe("Hardhat config", function () {
  //   useEnvironment("hardhat-project");
  // });

  describe("Test configs", function () {
    useEnvironment("hardhat-project");

    it("Networks", function () {
      assert.equal(this.hre.config.networks["thunder-testnet"].chainId, 18);
      assert.equal(this.hre.config.networks["thunder-mainnet"].chainId, 108);
    });
  });

  // describe("Test deploy logs", function () {
  //   useEnvironment("hardhat-project");

  //   it("test config networks", function () {});
  // });
});
