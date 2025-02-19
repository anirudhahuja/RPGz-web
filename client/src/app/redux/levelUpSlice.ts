import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface LevelRequirements {
  user: number[];
  strength: number[];
  agility: number[];
  intelligence: number[];
  wisdom: number[];
  endurance: number[];
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

interface LevelUpState {
  levelUp: boolean;
  playerData: PlayerData; // Changed from `PlayerData | null` to always have a default structure
}

// Default values for `PlayerData`
const initialPlayerData: PlayerData = {
  username: localStorage.getItem('username') || 'Unknown',
  level: {
    user: 1,
    strength: 1,
    agility: 1,
    intelligence: 1,
    wisdom: 1,
    endurance: 1,
  },
  class: 'Novice',
  health: 100,
  stamina: 50,
  xp: {
    user: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    wisdom: 0,
    endurance: 0,
  },
  levelRequirements: {} as PlayerData['levelRequirements'] // Will be populated from backend
};

const initialState: LevelUpState = {
  levelUp: false,
  playerData: initialPlayerData, // Default player data
};

const levelUpSlice = createSlice({
  name: 'levelUp',
  initialState,
  reducers: {
    triggerLevelUp(state) {
      state.levelUp = true;
    },
    resetLevelUp(state) {
      state.levelUp = false;
    },
    setPlayerData(state, action: PayloadAction<PlayerData>) {
      state.playerData = action.payload;
    },
  },
});

export const { triggerLevelUp, resetLevelUp, setPlayerData } = levelUpSlice.actions;
export default levelUpSlice.reducer;
