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
  playerData: PlayerData | null;
}

const initialState: LevelUpState = {
  levelUp: false,
  playerData: null,
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