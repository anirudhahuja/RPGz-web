import { PlayerData } from '@fitness-rpg/shared-types';

export interface CharacterProps {
    playerData: PlayerData;
    onInteract?: () => void;
}

// This is a base component that will be extended by platform-specific implementations
export const Character = ({ playerData, onInteract }: CharacterProps) => {
    // Platform-specific implementations will override this
    return null;
}; 