import type { PlayerData } from '@fitness-rpg/shared-types';

export function parseUserData(data: any): PlayerData {
    return {
        ...data,
        level: typeof data.level === 'string' ? JSON.parse(data.level) : data.level,
        xp: typeof data.xp === 'string' ? JSON.parse(data.xp) : data.xp,
        levelRequirements: typeof data.levelRequirements === 'string' 
            ? JSON.parse(data.levelRequirements) 
            : data.levelRequirements,
    };
} 