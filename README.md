# Simple AMM DEX

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![Math](https://img.shields.io/badge/formula-x*y=k-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Simple AMM DEX** is a smart contract that enables peer-to-contract token swapping. Unlike order-book exchanges, it relies on a mathematical formula (`reserve0 * reserve1 = constant`) to price assets automatically based on supply and demand.

## Mechanics

1.  **Liquidity Provision**: Users deposit an equivalent value of Token A and Token B. They receive "Shares" (LP Tokens) representing their portion of the pool.
2.  **Swapping**: Traders send Token A to the contract and get Token B. This changes the ratio of reserves, automatically adjusting the price for the next trade.
3.  **Fees**: A 0.3% fee is taken from every trade and added to the reserves, rewarding liquidity providers.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy DEX and Mock Tokens
npx hardhat run deploy.js --network localhost

# 3. Add Initial Liquidity (1000 Token A + 1000 Token B)
node add_liquidity.js

# 4. Swap Token A for Token B
node swap.js

# 5. Remove Liquidity (Burn Shares)
node remove_liquidity.js
