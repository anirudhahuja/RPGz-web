export interface PlayerStats {
  user: number;
  strength: number;
  agility: number;
  intelligence: number;
  wisdom: number;
  endurance: number;
}

export interface PlayerData {
  username: string;
  level: PlayerStats;
  class: string;
  health: number;
  stamina: number;
  xp: PlayerStats;
  levelRequirements: {
    [K in keyof PlayerStats]: number[];
  };
} 