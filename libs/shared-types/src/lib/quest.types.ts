export interface Quest {
    id: number;
    name: string;
    description: string;
    type: 'strength' | 'agility' | 'intelligence' | 'wisdom' | 'endurance';
    xp: number;
    primaryStatGain: string;
    completed: boolean;
    accepted: boolean;
    requirements?: {
        level?: number;
        class?: string[];
    };
    rewards?: {
        gold?: number;
        items?: string[];
    };
    progress?: number;
    deadline?: string;
}

export interface QuestCategory {
    strength: Quest[];
    agility: Quest[];
    intelligence: Quest[];
    wisdom: Quest[];
    endurance: Quest[];
}

export interface QuestLogState {
    availableQuests: Quest[];
    acceptedQuests: Quest[];
    completedQuests: Quest[];
    maxQuests: number;
}

export interface QuestLogProps {
    isOpen: boolean;
    onClose: () => void;
    maxQuests: number;
} 