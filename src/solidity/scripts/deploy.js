const { artifacts, ethers } = require('hardhat');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();

  const basicCommission = 2;
  const inheritanceCommission = 5;
  const flexibleCommission = 5;
  const minimumDaysDurationOfPlan = 1;
  const gracePeriodInDays = 30;

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // deploy contracts here:
  const CryptoRetirementPlan = await ethers.getContractFactory('CryptoRetirementPlan');
  const cryptoRetirementPlan = await CryptoRetirementPlan.deploy(
    basicCommission,
    inheritanceCommission,
    flexibleCommission,
    minimumDaysDurationOfPlan,
    gracePeriodInDays
  );
  console.log('CryptoRetirementPlan contract deployed to: ', cryptoRetirementPlan.address);

  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(cryptoRetirementPlan, 'CryptoRetirementPlan');
}

function saveFrontendFiles(contract, name) {
  const fs = require('fs');
  const contractsDir = path.join(__dirname, '/../../frontend/contractsData');

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(contractsDir + `/${name}-address.json`, JSON.stringify({ address: contract.address }, undefined, 2));

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(contractsDir + `/${name}.json`, JSON.stringify(contractArtifact, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
