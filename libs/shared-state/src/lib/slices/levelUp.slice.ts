import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerData, LevelUpState } from '@fitness-rpg/shared-types';

const initialPlayerData: PlayerData = {
    username: '',  // We'll handle this differently for web/mobile
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
    levelRequirements: {} as PlayerData['levelRequirements']
};

const initialState: LevelUpState = {
    levelUp: false,
    playerData: initialPlayerData,
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