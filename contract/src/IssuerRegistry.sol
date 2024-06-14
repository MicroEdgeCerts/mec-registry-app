// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract IssuerRegistry {

    uint256 public nextTokenId;

    mapping(uint256 => string) private _issuerData;
    mapping(uint256 => address) private _issuerOwners;
    mapping(address => uint256[]) private _addressToTokenIds;

    event IssuerRegistered(uint256 tokenId, address owner, string data );

    function getCurrentIssuerId() public view returns ( uint256 ) {
        return nextTokenId - 1; 
    }

    function registerIssuer(string memory data) public returns ( uint256 ) {
        uint256 tokenId = nextTokenId;
        _issuerData[tokenId] = data;
        _issuerOwners[tokenId] = msg.sender;
        _addressToTokenIds[msg.sender].push(tokenId);
        emit IssuerRegistered(tokenId, msg.sender, data);
        nextTokenId++;
        return tokenId;
    }

    function getIssuerData(uint256 tokenId) public view returns (string memory) {
        require(_issuerOwners[tokenId] != address(0), "Token does not exist");
        return _issuerData[tokenId];
    }

    
    function getIssuerDataByAddress(address owner) public view returns (string[] memory) {
        uint256[] memory tokenIds = _addressToTokenIds[owner];
        string[] memory issuerData = new string[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            issuerData[i] = _issuerData[tokenIds[i]];
        }

        return issuerData;
    }


    function getIssuerOwner(uint256 tokenId) public view returns (address) {
        require(_issuerOwners[tokenId] != address(0), "Token does not exist");
        return _issuerOwners[tokenId];
    }
}