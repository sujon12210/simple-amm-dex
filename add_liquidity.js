const { ethers } = require("hardhat");
const config = require("./amm_config.json");

async function main() {
    const [provider] = await ethers.getSigners();
    const amm = await ethers.getContractAt("AMM", config.amm, provider);
    const tokenA = await ethers.getContractAt("MockToken", config.tokenA, provider);
    const tokenB = await ethers.getContractAt("MockToken", config.tokenB, provider);

    const amountA = ethers.parseEther("1000");
    const amountB = ethers.parseEther("1000"); // 1:1 Ratio for simplicity

    console.log("Approving tokens...");
    await tokenA.approve(config.amm, amountA);
    await tokenB.approve(config.amm, amountB);

    console.log("Adding Liquidity...");
    const tx = await amm.addLiquidity(amountA, amountB);
    await tx.wait();

    console.log("Liquidity Added. LP Shares Minted.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
