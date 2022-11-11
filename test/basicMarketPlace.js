const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BasicMarketPlace", function () {
  it("Should return as a new product once deployed", async function () {
    const Contract = await ethers.getContractFactory("BasicMarketPlace");
    const contract = await Contract.deploy();
    await contract.deployed();

    expect(await contract.numProduct()).to.equal(1);
  });

  it("Should creat new Product", async () => {
    const Contract = await ethers.getContractFactory("BasicMarketPlace");
    const contract = await Contract.deploy();
    await contract.deployed();

    const productTxs = await contract.addProduct("Test Product", 200);
    expect(await contract.numProduct()).to.equal(2);
  });
});
