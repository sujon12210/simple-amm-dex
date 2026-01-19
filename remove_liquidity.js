const { ethers } = require("hardhat");
const config = require("./amm_config.json");

async function main() {
    const [provider] = await ethers.getSigners();
    const amm = await ethers.getContractAt("AMM", config.amm, provider);

    // Check share balance
    const shares = await amm.balanceOf(provider.address);
    console.log(`LP Shares Balance: ${shares}`);

    console.log("Removing 50% of Liquidity...");
    
    const amountToRemove = shares / 2n;
    
    const tx = await amm.removeLiquidity(amountToRemove);
    await tx.wait();

    console.log("Liquidity Removed. Tokens returned to wallet.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
