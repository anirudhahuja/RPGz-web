import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CharacterProps } from './Character';

export const NativeCharacter = ({ playerData, onInteract }: CharacterProps) => {
    return (
        <TouchableOpacity onPress={onInteract} style={styles.container}>
        <Text style={styles.username}>{playerData.username}</Text>
        <Text style={styles.info}>Level: {playerData.level.user}</Text>
        <Text style={styles.info}>Class: {playerData.class}</Text>
        {/* Add more native-specific UI here */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
    },
}); 