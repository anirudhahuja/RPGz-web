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
  name: string;
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
  name: 'Unknown',
  level: {
    user: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    wisdom: 0,
    endurance: 0,
  },
  class: 'Unknown',
  health: 0,
  stamina: 0,
  xp: {
    user: 0,
    strength: 0,
    agility: 0,
    intelligence: 0,
    wisdom: 0,
    endurance: 0,
  },
  levelRequirements: {
    user: [0, 10, 20, 30, 40],
    strength: [0, 50, 100, 150, 200],
    agility: [0, 50, 100, 150, 200],
    intelligence: [0, 50, 100, 150, 200],
    wisdom: [0, 50, 100, 150, 200],
    endurance: [0, 50, 100, 150, 200],
  },
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
