var SupplyChainApp = artifacts.require("./SupplyChainApp.sol");

module.exports = function(deployer) {
  deployer.deploy(SupplyChainApp);
};
  