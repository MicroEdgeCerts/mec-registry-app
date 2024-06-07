// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract IssuerRegistry {
    uint256 public nextTokenId;

    mapping(uint256 => string) private _tokenData;
    mapping(uint256 => address) private _tokenOwners;

    event TokenRegistered(uint256 tokenId, address owner, string data );

    function getCurrentTokenId() public view returns ( uint256 ) {
        return nextTokenId - 1; 
    }

    function registerToken(string memory data) public returns ( uint256 ) {
        uint256 tokenId = nextTokenId;
        _tokenData[tokenId] = data;
        _tokenOwners[tokenId] = msg.sender;
        emit TokenRegistered(tokenId, msg.sender, data);
        nextTokenId++;
        return tokenId;
    }

    function getTokenData(uint256 tokenId) public view returns (string memory) {
        require(_tokenOwners[tokenId] != address(0), "Token does not exist");
        return _tokenData[tokenId];
    }

    function getTokenOwner(uint256 tokenId) public view returns (address) {
        require(_tokenOwners[tokenId] != address(0), "Token does not exist");
        return _tokenOwners[tokenId];
    }
}