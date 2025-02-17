import axios from 'axios';
import { Env } from './types';
const WORKER_URL = 'https://fitness-rpg-service.ani-ahuja219.workers.dev'; 

export interface UserData {
    id?: number;
    username: string;
    class: string;
    health: number;
    stamina: number;
    level: {
        user: number;
        strength: number;
        agility: number;
        intelligence: number;
        wisdom: number;
        endurance: number;
    };
    xp: {
        user: number;
        strength: number;
        agility: number;
        intelligence: number;
        wisdom: number;
        endurance: number;
    };
    levelRequirements: {
        user: number[];
        strength: number[];
        agility: number[];
        intelligence: number[];
        wisdom: number[];
        endurance: number[];
    };
}

// Function to fetch all users from the Worker
export async function fetchUsers(): Promise<UserData[]> {
    try {
        const response = await axios.get(`${WORKER_URL}/users/all`);
        return response.data.map((user: any) => ({
            ...user,
            level: JSON.parse(user.level),
            xp: JSON.parse(user.xp),
            levelRequirements: JSON.parse(user.levelRequirements)
        }));
    } catch (error: any) {
        console.error('Error fetching users from Worker:', error.response?.data || error.message);
        throw new Error('Failed to fetch users from remote database.');
    }
}

// Function to fetch a specific user by name
export async function fetchUserByName(userName: string): Promise<UserData> {
    try {
        const response = await axios.get(`${WORKER_URL}/users?username=${encodeURIComponent(userName)}`);
        const user = response.data;

        if (!user) {
            throw new Error(`User "${userName}" not found`);
        }

        // Parse JSON fields into objects
        return {
            ...user,
            level: JSON.parse(user.level),
            xp: JSON.parse(user.xp),
            levelRequirements: JSON.parse(user.levelRequirements),
        };
    } catch (error: any) {
        console.error(`Error fetching user "${userName}":`, error.message || error);
        throw new Error(`Failed to fetch user "${userName}" from remote database.`);
    }
}


// Function to update a specific user by name
export async function updateUserByName(userName: string, updatedUser: UserData): Promise<void> {
    try {
        const dbUser = {
            ...updatedUser,
            level: JSON.stringify(updatedUser.level),
            xp: JSON.stringify(updatedUser.xp),
            levelRequirements: JSON.stringify(updatedUser.levelRequirements),
        };

        await axios.put(`${WORKER_URL}/users?username=${encodeURIComponent(userName)}`, dbUser, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('User updated successfully in the database.');
    } catch (error: any) {
        console.error('Error updating user in the database:', error.response?.data || error.message);
        throw new Error('Failed to update user in the remote database.');
    }
}

// Function to add a user to the authentication table
export async function addUserToAuthTable({ username, passwordHash, email }: { 
    username: string, 
    passwordHash: string, 
    email: string 
}): Promise<void> {
    try {
        await axios.post(`${WORKER_URL}/auth`, { 
            username, 
            password_hash: passwordHash, 
            email 
        });
    } catch (error: any) {
        // Keep this error log as it's useful for debugging auth issues
        console.error('Auth table error:', {
            status: error.response?.status,
            message: error.message
        });
        throw error;
    }
}

// Function to add a user to the profile table
export async function addUserToProfileTable(userProfile: UserData): Promise<void> {
    try {
        await axios.post(`${WORKER_URL}/profile`, userProfile);
    } catch (error) {
        console.error('Error adding user to profile table:', error);
        throw new Error('Failed to add user to profile table.');
    }
}

// Add these functions to handle quest-related operations
export const acceptQuest = async (username: string, questId: number): Promise<any> => {
    try {
        const response = await axios.post(`${WORKER_URL}/accepted-quests`, {
            username,
            quest_id: questId
        });
        return response.data;
    } catch (error) {
        console.error('Error accepting quest:', error);
        throw error;
    }
};

export const fetchQuests = async (username: string): Promise<any> => {
    try {
        const response = await axios.get(`${WORKER_URL}/quests?username=${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quests:', error);
        throw error;
    }
};

export const fetchAcceptedQuests = async (username: string): Promise<any> => {
    try {
        const response = await axios.get(`${WORKER_URL}/accepted-quests?username=${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching accepted quests:', error);
        throw error;
    }
};
