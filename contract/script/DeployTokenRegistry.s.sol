// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/IssuerRegistry.sol";
import "../src/AchievementCredentialRegistry.sol";

contract DeployIssuerRegistry is Script {
    function run() external {
        // Fetch the deployer private key from environment variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the IssuerRegistry contract
        IssuerRegistry issuerRegistry = new IssuerRegistry();
        AchievementCredentialRegistry acRegistry = new AchievementCredentialRegistry();


        // Print the address of the deployed contract
        console.log("IssuerRegistry deployed at:", address(issuerRegistry));
        console.log("AchievementCredentialRegistry deployed at:", address(acRegistry));
        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}
