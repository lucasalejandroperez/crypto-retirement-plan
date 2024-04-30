const { ethers } = require('ethers');
const fs = require('fs');

require('dotenv').config();

const {
  CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY,
  ALCHEMY_POLYGON_RPC_URL,
  ALCHEMY_ETHEREUM_RPC_URL,
  ALCHEMY_SEPOLIA_RPC_URL
} = process.env;

const chainConfigFilePath = './src/config-chains.json';
// Helper method for fetching a connection provider to the Ethereum network
function getAvailableChains() {
  const chainConfigRaw = fs.readFileSync(chainConfigFilePath);

  const chainConfigs = JSON.parse(chainConfigRaw);
  return chainConfigs;
}

const hardHatSettings = {
  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_RPC_URL,
      accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
      chainId: 11155111
    },
    polygon: {
      url: ALCHEMY_POLYGON_RPC_URL,
      accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
      chainId: 137
    },
    ethereum: {
      url: ALCHEMY_ETHEREUM_RPC_URL,
      accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
      chainId: 1
    }
  }
};

// Helper method for fetching a connection provider to the Ethereum network
function getNetworkSetting(chainId) {
  return Object.values(hardHatSettings.networks).find((chainSettings) => chainSettings.chainId === chainId);
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider(chainId) {
  const hardhatChainNetwork = getNetworkSetting(chainId);
  return ethers.getDefaultProvider(hardhatChainNetwork?.url);
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount(chainId) {
  const hardhatChainNetwork = getNetworkSetting(chainId);
  if (!hardhatChainNetwork) {
    console.error('\x1b[33m%s\x1b[0m', `No matching chainId found for network: '${chainId}', using localhost.`);
    return null;
  }
  return new ethers.Wallet(hardhatChainNetwork ? hardhatChainNetwork.accounts[0] : '', getProvider(chainId));
}

module.exports = {
  getAvailableChains,
  chainConfigFilePath,
  hardHatSettings,
  getProvider,
  getAccount,
  getNetworkSetting
};
