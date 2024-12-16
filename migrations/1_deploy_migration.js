// migrations/2_deploy_contracts.js
const Migration = artifacts.require("Migration");
const Election = artifacts.require("Election");

module.exports = function (deployer) {
  deployer.deploy(Migration).then(() => {
    return deployer.deploy(Election);
  });
};
