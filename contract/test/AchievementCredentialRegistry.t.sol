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
        string memory meta = "meta_data_1";
        string memory profile_id = "profile_owner";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(
            0, 
            keySets, 
            revokedKeySets, 
            cannonicalId, 
            meta, 
            profile_id,
            ownerType);

        AchievementCredentialRegistry.Achievement memory achievement = registry.getAchievement(1);
        assertEq(achievement.id, 1);
        assertEq(achievement.key_sets[0], "key1");
        assertEq(achievement.cannonical_id, "cannonical_id_1");
        assertEq(achievement.meta, "meta_data_1");
        assertEq(achievement.profile_id, profile_id);
        assertEq(uint256(achievement.owner_type), uint256(AchievementCredentialRegistry.OwnerType.BlockChain));
    }

    function testUpdateAchievement() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        string memory meta = "meta_data_1";
        string memory profile_id = "profile_owner";

        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(
            0, 
            keySets, 
            revokedKeySets, 
            cannonicalId, 
            meta, 
            profile_id, 
            ownerType);

        string[] memory newKeySets = new string[](1);
        newKeySets[0] = "key2";
        string[] memory newRevokedKeySets = new string[](1);
        newRevokedKeySets[0] = "revoked_key1";
        string memory newCannonicalId = "cannonical_id_2";
        string memory newMeta = "meta_data_2";
        string memory newProfileId = "profile_2";

        AchievementCredentialRegistry.OwnerType newOwnerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(
            1, 
            newKeySets, 
            newRevokedKeySets, 
            newCannonicalId, 
            newMeta, 
            newProfileId, 
            newOwnerType);

        AchievementCredentialRegistry.Achievement memory updatedAchievement = registry.getAchievement(1);
        assertEq(updatedAchievement.id, 1);
        assertEq(updatedAchievement.key_sets[0], "key2");
        assertEq(updatedAchievement.revoked_key_sets[0], "revoked_key1");
        assertEq(updatedAchievement.cannonical_id, "cannonical_id_2");
        assertEq(updatedAchievement.meta, "meta_data_2");
        assertEq(updatedAchievement.profile_id, newProfileId );
        assertEq(uint256(updatedAchievement.owner_type), uint256(AchievementCredentialRegistry.OwnerType.BlockChain));
    }

    function testRevokeAchievement() public {

        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        vm.warp(block.timestamp + 1 days);
        string memory meta = "meta_data_1";
        string memory ownerSrc = "owner_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(0, keySets, revokedKeySets, cannonicalId, meta, ownerSrc, ownerType);

        registry.revokeAchievement(1);

        AchievementCredentialRegistry.Achievement memory achievement = registry.getAchievement(1);
        assertEq(achievement.id, 0, "Expected achievement to be revoked");

    }

    function testAddAchievementWith0Days() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        string memory meta = "meta_data_1";
        string memory profileId = "profile_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(
            0, 
            keySets, 
            revokedKeySets, 
            cannonicalId, 
            meta, 
            profileId, 
            ownerType);

        AchievementCredentialRegistry.Achievement memory updatedAchievement = registry.getAchievement(1);
        assertEq(updatedAchievement.id, 1);
    }

    function testGetAchievementsByOwnerId() public {
        string[] memory keySets = new string[](1);
        keySets[0] = "key1";
        string[] memory revokedKeySets = new string[](0);
        string memory cannonicalId = "cannonical_id_1";
        string memory meta = "meta_data_1";
        string memory profileId = "profileId_1";
        AchievementCredentialRegistry.OwnerType ownerType = AchievementCredentialRegistry.OwnerType.BlockChain;

        registry.createOrUpdateAchievement(
            0, 
            keySets, 
            revokedKeySets, 
            cannonicalId, 
            meta, 
            profileId, 
            ownerType);

        AchievementCredentialRegistry.Achievement[] memory achievements = registry.getAchievementsByProfileId(profileId);
        assertEq(achievements.length, 1);
        assertEq(achievements[0].id, 1);
        assertEq(achievements[0].profile_id, profileId);
        assertEq(uint256(achievements[0].owner_type), uint256(AchievementCredentialRegistry.OwnerType.BlockChain));
    }
}
