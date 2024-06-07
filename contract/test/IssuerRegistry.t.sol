// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {IssuerRegistry} from "../src/IssuerRegistry.sol";

contract IssuerRegistryTest is Test {

    IssuerRegistry public issuerRegistry;

    function setUp() public {
        issuerRegistry = new IssuerRegistry();
    }

    function testRegisterToken() public {
        string memory tokenData = "Token Data 1";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerToken(tokenData);

        // Verify the token data and owner
        string memory registeredData = issuerRegistry.getTokenData(tokenId);
        address owner = issuerRegistry.getTokenOwner(tokenId);

        assertEq(registeredData, tokenData);
        assertEq(owner, address(this));
    }

    function testGetTokenData() public {
        string memory tokenData = "Token Data 2";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerToken(tokenData);

        // Verify the token data
        string memory registeredData = issuerRegistry.getTokenData(tokenId);

        assertEq(registeredData, tokenData);
    }

    function testGetTokenOwner() public {
        string memory tokenData = "Token Data 3";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerToken(tokenData);

        // Verify the token owner
        address owner = issuerRegistry.getTokenOwner(tokenId);

        assertEq(owner, address(this));
    }

}
