import axios from 'axios';

const WORKER_URL = 'https://fitness-rpg-service.ani-ahuja219.workers.dev'; 

interface UserData {
    id: number;
    name: string;
    class: string;
    health: number;
    stamina: number;
    level: Record<string, number>;
    xp: Record<string, number>;
    levelRequirements: Record<string, number[]>;
}

// Function to fetch all users from the Worker
export async function fetchUsers(): Promise<UserData[]> {
    try {
        const response = await axios.get(`${WORKER_URL}/users/all`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching users from Worker:', error.response?.data || error.message);
        throw new Error('Failed to fetch users from remote database.');
    }
}

// Function to add a new user via the Worker
export async function addUser(userData: UserData): Promise<void> {
    try {
        await axios.post(`${WORKER_URL}/save-user`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('User added successfully.');
    } catch (error: any) {
        console.error('Error adding user:', error.response?.data || error.message);
        throw new Error('Failed to add new user.');
    }
}

// Function to fetch a specific user by name
export async function fetchUserByName(userName: string): Promise<UserData> {
    try {
        const response = await axios.get(`${WORKER_URL}/users?name=${encodeURIComponent(userName)}`);
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

        await axios.put(`${WORKER_URL}/users?name=${encodeURIComponent(userName)}`, dbUser, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('User updated successfully in the database.');
    } catch (error: any) {
        console.error('Error updating user in the database:', error.response?.data || error.message);
        throw new Error('Failed to update user in the remote database.');
    }
}
