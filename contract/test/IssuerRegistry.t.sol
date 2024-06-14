// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "../src/IssuerRegistry.sol";  

contract IssuerRegistryTest is Test {

    IssuerRegistry public issuerRegistry;

    function setUp() public {
        issuerRegistry = new IssuerRegistry();
    }

    function testRegisterToken() public {
        string memory tokenData = "Token Data 1";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerIssuer(tokenData);

        // Verify the token data and owner
        string memory registeredData = issuerRegistry.getIssuerData(tokenId);
        address owner = issuerRegistry.getIssuerOwner(tokenId);
        string[] memory dataList = issuerRegistry.getIssuerDataByAddress(address(this));
        assertEq(registeredData, tokenData);
        assertEq(owner, address(this));
        assertEq(dataList.length, 1);
    }

    function testGetDataByAddress() public {
        string memory tokenData = "Token Data 1";

        // Register the token and get the tokenId
        issuerRegistry.registerIssuer(tokenData);
        issuerRegistry.registerIssuer(tokenData);
        string[] memory dataList = issuerRegistry.getIssuerDataByAddress(address(this));

        // Verify the token data and owner
        assertEq(dataList.length, 2);
    }

    function testGetTokenData() public {
        string memory tokenData = "Token Data 2";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerIssuer(tokenData);

        // Verify the token data
        string memory registeredData = issuerRegistry.getIssuerData(tokenId);

        assertEq(registeredData, tokenData);
    }

    function testGetTokenOwner() public {
        string memory tokenData = "Token Data 3";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerIssuer(tokenData);

        // Verify the token owner
        address owner = issuerRegistry.getIssuerOwner(tokenId);

        assertEq(owner, address(this));
    }


}
