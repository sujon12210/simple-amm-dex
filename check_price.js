const { ethers } = require("hardhat");
const config = require("./amm_config.json");

async function main() {
    const amm = await ethers.getContractAt("AMM", config.amm);

    const r0 = await amm.reserve0();
    const r1 = await amm.reserve1();

    console.log("--- Pool Status ---");
    console.log(`Reserve 0: ${ethers.formatEther(r0)}`);
    console.log(`Reserve 1: ${ethers.formatEther(r1)}`);

    // Simple price calculation (Ratio)
    // Be careful with decimals in real production
    if (r0 > 0) {
        const price = Number(r1) / Number(r0);
        console.log(`Implied Price: 1 Token0 = ${price.toFixed(4)} Token1`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
