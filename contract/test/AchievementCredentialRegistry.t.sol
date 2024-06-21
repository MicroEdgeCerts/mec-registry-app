// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/AchievementCredentialRegistry.sol"; // Adjust the import path as necessary

contract AchievementCredentialRegistryTest is Test {
    AchievementCredentialRegistry public registry;

    function setUp() public {
        registry = new AchievementCredentialRegistry();
    }

    function testCreateAchievement() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        uint256 validFrom = block.timestamp + 1 days;
        uint256 validUntil = block.timestamp + 30 days;
        string memory image = "image_url_1";
        string memory meta = "meta_data_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, validFrom, validUntil, image, meta, ownerSrc, ownerType);

        AchievementCredentialRegistry.Achievement memory achievement = registry.getAchievement(1);
        assertEq(achievement.id, 1);
        assertEq(achievement.key_sets[0], "key1");
        assertEq(achievement.cannonical_id, "cannonical_id_1");
        assertEq(achievement.validFrom, validFrom);
        assertEq(achievement.validUntil, validUntil);
        assertEq(achievement.image, "image_url_1");
        assertEq(achievement.meta, "meta_data_1");
        assertEq(achievement.owner_src, "owner_1");
        assertEq(uint256(achievement.owner_type), uint256(AchievementCredentialRegistry.OwnerType.BlockChain));
    }

    function testUpdateAchievement() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        uint256 validFrom = block.timestamp + 1 days;
        uint256 validUntil = block.timestamp + 30 days;
        string memory image = "image_url_1";
        string memory meta = "meta_data_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, validFrom, validUntil, image, meta, ownerSrc, ownerType);

        string[] memory newKeySets = new string[](1);
        newKeySets[0] = "key2";
        string[] memory newRevokedKeySets = new string[](1);
        newRevokedKeySets[0] = "revoked_key1";
        string memory newCannonicalId = "cannonical_id_2";
        uint256 newValidFrom = block.timestamp + 2 days;
        uint256 newValidUntil = block.timestamp + 60 days;
        string memory newImage = "image_url_2";
        string memory newMeta = "meta_data_2";
        string memory newOwnerSrc = "owner_2";
        AchievementCredentialRegistry.OwnerType newOwnerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(1, newKeySets, newRevokedKeySets, newCannonicalId, newValidFrom, newValidUntil, newImage, newMeta, newOwnerSrc, newOwnerType);

        AchievementCredentialRegistry.Achievement memory updatedAchievement = registry.getAchievement(1);
        assertEq(updatedAchievement.id, 1);
        assertEq(updatedAchievement.key_sets[0], "key2");
        assertEq(updatedAchievement.revoked_key_sets[0], "revoked_key1");
        assertEq(updatedAchievement.cannonical_id, "cannonical_id_2");
        assertEq(updatedAchievement.validFrom, newValidFrom);
        assertEq(updatedAchievement.validUntil, newValidUntil);
        assertEq(updatedAchievement.image, "image_url_2");
        assertEq(updatedAchievement.meta, "meta_data_2");
        assertEq(updatedAchievement.owner_src, "owner_2");
        assertEq(uint256(updatedAchievement.owner_type), uint256(AchievementCredentialRegistry.OwnerType.BlockChain));
    }

    function testRevokeAchievement() public {

        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        vm.warp(block.timestamp + 1 days);
        uint256 validFrom = block.timestamp + 1 days;
        uint256 validUntil = block.timestamp + 30 days;
        string memory image = "image_url_1";
        string memory meta = "meta_data_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, validFrom, validUntil, image, meta, ownerSrc, ownerType);

        registry.revokeAchievement(1);

        AchievementCredentialRegistry.Achievement memory achievement = registry.getAchievement(1);
        assertEq(achievement.id, 0, "Expected achievement to be revoked");

    }

    function testAddAchievementWith0Days() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        string memory image = "image_url_1";
        string memory meta = "meta_data_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, 0, 0, image, meta, ownerSrc, ownerType);

        AchievementCredentialRegistry.Achievement memory updatedAchievement = registry.getAchievement(1);
        assertEq(updatedAchievement.id, 1);
    }

    function testInvalidAchievementValidityPeriod() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        // Move block timestamp forward
        vm.warp(block.timestamp + 1 days);
        uint256 validFrom = block.timestamp;
        uint256 validUntil = block.timestamp - 1 days; // Invalid, before validFrom

        try registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, validFrom, validUntil, "", "", ownerSrc, ownerType) {
            fail();
        } catch Error(string memory) {
            // Expected revert, test passes
        }

        validFrom = block.timestamp + 1 days; // Valid, in the future
        validUntil = block.timestamp; // Invalid, before validFrom

        try registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, validFrom, validUntil, "", "", ownerSrc, ownerType) {
            fail();
        } catch Error(string memory) {
            // Expected revert, test passes
        }
    }

    function testGetAchievementsByOwnerId() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        uint256 validFrom = block.timestamp + 1 days;
        uint256 validUntil = block.timestamp + 30 days;
        string memory image = "image_url_1";
        string memory meta = "meta_data_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, validFrom, validUntil, image, meta, ownerSrc, ownerType);

        AchievementCredentialRegistry.Achievement[] memory achievements = registry.getAchievementsByOwnerId("owner_1");
        assertEq(achievements.length, 1);
        assertEq(achievements[0].id, 1);
        assertEq(achievements[0].owner_src, "owner_1");
        assertEq(uint256(achievements[0].owner_type), uint256(AchievementCredentialRegistry.OwnerType.BlockChain));
    }
}
