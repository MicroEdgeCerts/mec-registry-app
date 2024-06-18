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
        string memory meta = 'ipfslocation';
        string memory id = "https://test.com";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerIssuer(id, meta);

        // Verify the token data and owner
        IssuerRegistry.Issuer memory registeredData = issuerRegistry.getIssuerDataByTokenId( tokenId );
        address owner = issuerRegistry.getIssuerOwner(tokenId);
        IssuerRegistry.Issuer[] memory dataList = issuerRegistry.getIssuerDataByAddress(address(this));
        // Parse the JSON-like string manually (for simplicity in this example)


        assertEq(registeredData.tokenId, tokenId);
        assertEq(owner, address(this));
        assertEq(dataList.length, 1);
    }

    function testGetDataByAddress() public {
        string memory tokenData = '{"name": "issuer"}';
        string memory id = "https://test.com";
        string memory id2 = "https://testB.com";
        // Register the token and get the tokenId
        issuerRegistry.registerIssuer(id, tokenData);
        issuerRegistry.registerIssuer(id2, tokenData);
        IssuerRegistry.Issuer[] memory dataList1 = issuerRegistry.getIssuerDataByAddress(address(this));
        IssuerRegistry.Issuer[] memory dataList2 = issuerRegistry.getIssuerData();

        // Verify the token data and owner
        assertEq(dataList1.length, 2);
        assertEq(dataList2.length, dataList2.length);

    }

    function testGetTokenData() public {
        string memory tokenData = '{"name": "issuer"}';
        string memory id = "https://test.com";
        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerIssuer(id, tokenData);

        // Verify the token data
        IssuerRegistry.Issuer memory registeredData = issuerRegistry.getIssuerDataByTokenId(tokenId);

        assertEq(registeredData.tokenId, tokenId);
    }

    function testGetTokenOwner() public {
        string memory tokenData = '{"name": "issuer"}';
        string memory id = "https://test.com";

        // Register the token and get the tokenId
        uint256 tokenId = issuerRegistry.registerIssuer(id, tokenData);

        // Verify the token owner
        address owner = issuerRegistry.getIssuerOwner(tokenId);

        assertEq(owner, address(this));
    }


}
