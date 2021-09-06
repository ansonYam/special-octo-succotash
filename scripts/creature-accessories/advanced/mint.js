const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const LOOTBOX_CONTRACT_ADDRESS = process.env.LOOTBOX_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const LOOTBOX_ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_optionId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_toAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'unpack',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

/**
 * For now, this script just opens a lootbox.
 */
async function main() {
  const network =
    NETWORK === 'mainnet' || NETWORK === 'live' ? 'mainnet' : 'rinkeby'
  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );
  const web3Instance = new web3(provider);

  if (!LOOTBOX_CONTRACT_ADDRESS) {
    console.error('Please set a LootBox contract address.')
    return
  }

  const factoryContract = new web3Instance.eth.Contract(
    LOOTBOX_ABI,
    LOOTBOX_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
  );

  const result = await factoryContract.methods
    .unpack(0, OWNER_ADDRESS, 1)
    .send({ from: OWNER_ADDRESS });
  console.log('Created. Transaction: ' + result.transactionHash);
}

main().catch((e) => console.error(e));