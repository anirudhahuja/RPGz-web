export interface PlayerLevel {
    user: number;
    strength: number;
    agility: number;
    intelligence: number;
    wisdom: number;
    endurance: number;
}

export interface PlayerXP {
    user: number;
    strength: number;
    agility: number;
    intelligence: number;
    wisdom: number;
    endurance: number;
}

export type LevelRequirements = {
    [K in keyof PlayerLevel]: number[];
}

export interface PlayerData {
    username: string;
    level: PlayerLevel;
    class: string;
    health: number;
    stamina: number;
    xp: PlayerXP;
    levelRequirements: LevelRequirements;
}

export interface LevelUpState {
    levelUp: boolean;
    playerData: PlayerData;
} 