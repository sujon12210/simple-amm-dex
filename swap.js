const { ethers } = require("hardhat");
const config = require("./amm_config.json");

async function main() {
    const [_, trader] = await ethers.getSigners(); // Use 2nd account
    const amm = await ethers.getContractAt("AMM", config.amm, trader);
    const tokenA = await ethers.getContractAt("MockToken", config.tokenA, trader);

    // Need to send some Token A to trader first from the deployer
    const [deployer] = await ethers.getSigners();
    await tokenA.connect(deployer).transfer(trader.address, ethers.parseEther("100"));

    const swapAmount = ethers.parseEther("10");

    console.log("Approving Token A...");
    await tokenA.approve(config.amm, swapAmount);

    console.log(`Swapping 10 Token A for Token B...`);
    
    // We expect Token B in return
    const tx = await amm.swap(config.tokenA, swapAmount);
    await tx.wait();

    console.log("Swap Successful!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
