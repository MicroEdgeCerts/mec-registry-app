// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AchievementCredentialRegistry {
    struct Achievement {
        uint256 id;
        string[] key_sets;
        string[] revoked_key_sets;
        string cannonical_id;  // Renamed to cannonical_id
        uint256 validFrom;
        uint256 validUntil;
        string image;
        string meta;
        string owner_src; // Added owner_src
        OwnerType owner_type; // Added owner_type
    }

    enum OwnerType { BlockChain }

    mapping(uint256 => Achievement) private _achievements;
    mapping(string => uint256[]) private ownerIdToIds; // Added mapping
    uint256 private _nextId;

    event AchievementAdded(uint256 id, string cannonical_id);
    event AchievementUpdated(uint256 id, string cannonical_id);
    event AchievementRevoked(uint256 id);
    constructor() {
        _nextId = 1; // Initialize _nextId to start from 1
    }

     function createOrUpdateAchievement(
        uint256 id,
        string[] memory key_sets,
        string[] memory revoked_key_sets,
        string memory cannonical_id,
        uint256 validFrom,
        uint256 validUntil,
        string memory image,
        string memory meta,
        string memory owner_src,
        OwnerType owner_type
    ) public {

        require(_isAchievementValid(validFrom, validUntil), "Invalid achievement validity period");

        if (validFrom == 0) {
            validFrom = block.timestamp;
        }

        if (id == 0) {
            id = _nextId++;
            _achievements[id] = Achievement({
                id: id,
                key_sets: key_sets,
                revoked_key_sets: revoked_key_sets,
                cannonical_id: cannonical_id,
                validFrom: validFrom,
                validUntil: validUntil,
                image: image,
                meta: meta,
                owner_src: owner_src,
                owner_type: owner_type
            });
            ownerIdToIds[owner_src].push(id);
            emit AchievementAdded(id, cannonical_id);
        } else {
            Achievement storage achievement = _achievements[id];
            achievement.key_sets = key_sets;
            achievement.revoked_key_sets = revoked_key_sets;
            achievement.cannonical_id = cannonical_id;
            achievement.validFrom = validFrom;
            achievement.validUntil = validUntil;
            achievement.image = image;
            achievement.meta = meta;
            achievement.owner_src = owner_src;
            achievement.owner_type = owner_type;
            emit AchievementUpdated(id, cannonical_id);
        }
    }

    function getAchievement(uint256 id) public view returns (Achievement memory) {
        return _achievements[id];
    }

    function revokeAchievement(uint256 id) public {
        require(_achievements[id].id != 0, "Achievement does not exist");
        delete _achievements[id];
        emit AchievementRevoked(id);
    }

    function getAchievementsByOwnerId(string memory ownerId) public view returns (Achievement[] memory) {
        uint256[] memory ids = ownerIdToIds[ownerId];
        Achievement[] memory achievements = new Achievement[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            achievements[i] = _achievements[ids[i]];
        }
        return achievements;
    }

    function _isAchievementValid(uint256 validFrom, uint256 validUntil) private pure returns (bool) {
        if (validUntil != 0 && validFrom >= validUntil) {
            return false;
        }
        return true;
    }
}