const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    // 1. Deploy Token A
    const Token = await ethers.getContractFactory("MockToken");
    const tokenA = await Token.deploy("Token A", "TKA");
    await tokenA.waitForDeployment();
    
    // 2. Deploy Token B
    const tokenB = await Token.deploy("Token B", "TKB");
    await tokenB.waitForDeployment();

    const addrA = await tokenA.getAddress();
    const addrB = await tokenB.getAddress();

    console.log(`Token A: ${addrA}`);
    console.log(`Token B: ${addrB}`);

    // 3. Deploy AMM
    const AMM = await ethers.getContractFactory("AMM");
    const amm = await AMM.deploy(addrA, addrB);
    await amm.waitForDeployment();
    const ammAddr = await amm.getAddress();

    console.log(`AMM Deployed: ${ammAddr}`);

    // Save Config
    const config = { amm: ammAddr, tokenA: addrA, tokenB: addrB };
    fs.writeFileSync("amm_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
