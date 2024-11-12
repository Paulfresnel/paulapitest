var express = require('express')
var router = express.Router()
const Web3 = require("web3").default();


const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/-jj0R5x1-cVVk1bsNT9-rkSslNhlmGQE'); //Connect to an alchemy Node to interact with the blockchain
const CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT contract address

const ABI = [
    // Minimal ABI information to get the name, symbol and totalSupply of the token
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {  
        "constant":true,
        "inputs":[],
        "name":"_totalSupply",
        "outputs":[{"name":"","type":"uint256"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    }
];

// Initialize contract instance with ABI & contract address information
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS); 

 // Set up the test route to fetch basic information about the USDC token smart contract
router.get("/paulapitest", async (req, res) => { 
    try {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol.call();
        const totatlSupply = BigInt(await contract.methods._totalSupply().call()).toString();

        console.log(`Token Name: ${name}`)
        console.log(`Token Symbol: ${symbol}`)
        console.log(`Token Total Supply: ${totalSupply}`)

        res.status(201).json({
            success: true,
            message: "Here's some brief information about the USDT token smart contract data on the Ethereum blockchain",
            tokenSymbol: symbol,
            tokenName: name,
            tokenTotalSupply: totatlSupply

    })} 
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There's been an error with the server",
            errorMessage: err
        })
        }
    }
)

module.exports = router;
