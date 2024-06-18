// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract IssuerRegistry {

    event IssuerRegistered(uint256 tokenId, address owner, string data);
    struct Issuer {
        string id;
        uint256 tokenId;
        string meta;
        address owner;
    }

    uint256 private currentTokenId = 1;
    mapping(uint256 => Issuer) private issuers;
    mapping(address => uint256[]) private issuerTokensByOwner;
    mapping(string => uint256) private issuerTokenById;

    function getCurrentTokenId() public view returns (uint256) {
        return currentTokenId;
    }

    function getIssuerData() public view returns (Issuer[] memory) {
        Issuer [] memory allData = new Issuer[](currentTokenId);
        for (uint256 i = 1; i <= currentTokenId; i++) {
            allData[i - 1] = issuers[i];
        }
        return allData;
    }

    function getIssuerDataByAddress(address owner) public view returns (Issuer[] memory) {
        uint256[] memory tokenIds = issuerTokensByOwner[owner];
        Issuer[] memory data = new Issuer[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            data[i] = issuers[tokenIds[i]];
        }
        return data;
    }

    function getIssuerDataById(string memory id) public view returns (Issuer memory) {
        uint256 tokenId = issuerTokenById[id];
        return issuers[tokenId];
    }

    function getIssuerDataByTokenId(uint256 tokenId) public view returns (Issuer memory) {
        return issuers[tokenId];
    }


    function getIssuerOwner(uint256 tokenId) public view returns (address) {
        return issuers[tokenId].owner;
    }

    function nextTokenId() public view returns (uint256) {
        return currentTokenId + 1;
    }

    function registerIssuer(string memory id, string memory meta) public returns (uint256) {
        currentTokenId++;
        uint256 tokenId = currentTokenId;

        issuers[tokenId] = Issuer({
            id: id,
            tokenId: tokenId,
            meta: meta,
            owner: msg.sender
        });

        issuerTokensByOwner[msg.sender].push(tokenId);
        issuerTokenById[id] = tokenId;

        emit IssuerRegistered(tokenId, msg.sender, meta);

        return tokenId;
    }
}