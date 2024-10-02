const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("LandRegistryModule", (m) => {

  const LandRegistry = m.contract("LandRegistry")

  return { LandRegistry };
});
