// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract IssuerRegistry {
    uint256 public nextTokenId;

    mapping(uint256 => string) private _issuerData;
    mapping(uint256 => address) private _issuerOwners;

    event IssuerRegistered(uint256 tokenId, address owner, string data );

    function getCurrentIssuerId() public view returns ( uint256 ) {
        return nextTokenId - 1; 
    }

    function registerIssuer(string memory data) public returns ( uint256 ) {
        uint256 tokenId = nextTokenId;
        _issuerData[tokenId] = data;
        _issuerOwners[tokenId] = msg.sender;
        emit IssuerRegistered(tokenId, msg.sender, data);
        nextTokenId++;
        return tokenId;
    }

    function getIssuerData(uint256 tokenId) public view returns (string memory) {
        require(_issuerOwners[tokenId] != address(0), "Token does not exist");
        return _issuerData[tokenId];
    }

    function getIssuerOwner(uint256 tokenId) public view returns (address) {
        require(_issuerOwners[tokenId] != address(0), "Token does not exist");
        return _issuerOwners[tokenId];
    }
}