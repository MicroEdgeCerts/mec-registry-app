// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/IssuerRegistry.sol";

contract DeployIssuerRegistry is Script {
    function run() external {
        // Fetch the deployer private key from environment variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the TokenRegistry contract
        TokenRegistry tokenRegistry = new TokenRegistry();

        // Print the address of the deployed contract
        console.log("TokenRegistry deployed at:", address(tokenRegistry));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}
