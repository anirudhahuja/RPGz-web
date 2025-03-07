import React from 'react';
import { CharacterProps } from './Character';

export const WebCharacter = ({ playerData, onInteract }: CharacterProps) => {
    return (
        <div 
            onClick={onInteract}
            style={{ cursor: 'pointer' }}
        >
        <h2>{playerData.username}</h2>
        <div>Level: {playerData.level.user}</div>
        <div>Class: {playerData.class}</div>
        {/* Add more web-specific UI here */}
        </div>
    );
}; 