// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AchievementCredentialRegistry {
    struct Achievement {
        uint256 id;
        string[] key_sets;
        string[] revoked_key_sets;
        string cannonical_id;  // Renamed to cannonical_id
        string meta;
        string profile_id;
        string owner_id; // Added owner_src
        OwnerType owner_type; // Added owner_type
    }

    enum OwnerType { BlockChain }

    mapping(uint256 => Achievement) private _achievements;
    mapping(string => uint256[]) private profileIdToIds; // Added mapping
    mapping(string => uint256[]) private ownerToIds; // Added mapping
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
        string memory meta,
        string memory profile_id,
        OwnerType owner_type
    ) public returns ( uint256 ){

        string memory owner_id = addressToString(msg.sender);


        if (id == 0) {
            id = _nextId++;
            _achievements[id] = Achievement({
                id: id,
                key_sets: key_sets,
                revoked_key_sets: revoked_key_sets,
                cannonical_id: cannonical_id,
                meta: meta,
                profile_id: profile_id,
                owner_id: owner_id,
                owner_type: owner_type
            });
            profileIdToIds[profile_id].push(id);
            emit AchievementAdded(id, cannonical_id);
        } else {
            Achievement storage achievement = _achievements[id];
            require(keccak256(bytes(achievement.owner_id)) == keccak256(bytes(owner_id) ), "Only the same owner can update");
            _removeIdFromProfileIdMapping(achievement.profile_id, id);
            
            achievement.key_sets = key_sets;
            achievement.revoked_key_sets = revoked_key_sets;
            achievement.cannonical_id = cannonical_id;
            achievement.meta = meta;
            achievement.profile_id = profile_id;
            achievement.owner_id = owner_id;
            achievement.owner_type = owner_type;    

            profileIdToIds[profile_id].push(id);
            emit AchievementUpdated(id, cannonical_id);
        }
        return id;
    }

    function getAchievement(uint256 id) public view returns (Achievement memory) {
        return _achievements[id];
    }

    function revokeAchievement(uint256 id) public {
        require(_achievements[id].id != 0, "Achievement does not exist");
        delete _achievements[id];
        emit AchievementRevoked(id);
    }

    function getAchievementsByProfileId(string memory profileId) public view returns (Achievement[] memory) {
        uint256[] memory ids = profileIdToIds[profileId];
        Achievement[] memory achievements = new Achievement[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            achievements[i] = _achievements[ids[i]];
        }
        return achievements;
    }

    function _removeIdFromProfileIdMapping(string memory profileId, uint256 id) private {
        uint256[] storage ids = profileIdToIds[profileId];
        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                ids[i] = ids[ids.length - 1];
                ids.pop();
                break;
            }
        }
    }

    function addressToString(address _addr) private pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
}