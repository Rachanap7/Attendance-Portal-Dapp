// 2_first_contracts.js
const teacher = artifacts.require("teacher");

module.exports = function(deployer) {
  deployer.deploy(teacher);
};