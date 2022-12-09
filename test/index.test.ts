// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";

describe("thundercore hardhat tests", function () {
  describe("Test configs", function () {
    useEnvironment("project");

    it("Networks", function () {
      assert.equal(this.hre.config.networks["thunder-testnet"].chainId, 18);
      assert.equal(this.hre.config.networks["thunder-mainnet"].chainId, 108);
    });
  });
});
