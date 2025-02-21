import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { 
    fetchUsers, 
    fetchUserByName, 
    updateUserByName, 
    addUserToAuthTable, 
    addUserToProfileTable,
    UserData,
    acceptQuest
} from './workerService';
const WORKER_URL = 'https://fitness-rpg-service.ani-ahuja219.workers.dev';

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Add this type near the top of the file
type StatType = 'user' | 'strength' | 'agility' | 'intelligence' | 'wisdom' | 'endurance';

// Route to fetch all users from the Worker
app.get('/api/users', async (req, res) => {
    try {
        const users = await fetchUsers();
        res.json(users);
    } catch (error: any) {
        console.error('Error in /api/users route:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Route to register a new user
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        try {
            await addUserToAuthTable({ username, passwordHash, email });
        } catch (authError: any) {
            // Keep this error log for production debugging
            console.error('Auth error:', authError.message);
            throw new Error(`Auth table error: ${authError.message}`);
        }

        const defaultProfile: UserData = {
            username,
            class: 'Novice',
            health: 100,
            stamina: 50,
            level: {
                user: 1,
                strength: 1,
                agility: 1,
                intelligence: 1,
                wisdom: 1,
                endurance: 1
            },
            xp: {
                user: 0,
                strength: 0,
                agility: 0,
                intelligence: 0,
                wisdom: 0,
                endurance: 0
            },
            levelRequirements: {
                user: [0, 3, 4, 4, 6, 6, 8, 8, 10, 10],
                strength: [0, 60, 100, 140, 200, 260, 340, 420, 500, 600],
                agility: [0, 60, 100, 140, 200, 260, 340, 420, 500, 600],
                intelligence: [0, 60, 100, 140, 200, 260, 340, 420, 500, 600],
                wisdom: [0, 60, 100, 140, 200, 260, 340, 420, 500, 600],
                endurance: [0, 60, 60, 100, 100, 100, 150, 150, 200, 200]
            }
        };

        // Add more detailed error handling for profile table
        try {
            await addUserToProfileTable(defaultProfile);
        } catch (profileError: any) {
            console.error('Profile table error:', profileError.response?.data || profileError.message);
            throw new Error(`Profile table error: ${profileError.message}`);
        }

        res.status(201).json({ 
            message: 'User registered successfully',
            user: defaultProfile 
        });
    } catch (error: any) {
        console.error('Error registering user:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to register user',
            details: error.message 
        });
    }
});

// Route to handle login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // First get the stored hash
        const authResponse = await axios.get(`${WORKER_URL}/auth?username=${username}`);
        const user = authResponse.data;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password with stored hash
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If credentials are valid, fetch user profile
        const userProfile = await fetchUserByName(username);

        res.json({ 
            message: 'Login successful',
            user: userProfile
        });
    } catch (error: any) {
        console.error('Login error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Login failed',
            details: error.response?.data?.error || error.message
        });
    }
});

// Route to fetch specific user info by name
app.get('/api/user-info', async (req, res) => {
    const username = req.query.username as string;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const result = await fetchUserByName(username);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result); // User data is already parsed in workerService
    } catch (error: any) {
        console.error('Error fetching user info:', error.message || error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

// Route to fetch all quests from the Worker
app.get('/api/quests', async (req, res) => {
    try {
        const username = req.query.username as string;
        // Pass username to get completion status
        const response = await axios.get(`${WORKER_URL}/quests${username ? `?username=${username}` : ''}`);
        const quests = response.data;

        // Group quests by primaryStatGain, including completion status
        const categorizedQuests = quests.reduce((acc: any, quest: any) => {
            const stat = quest.primaryStatGain.toLowerCase();
            if (!acc[stat]) {
                acc[stat] = [];
            }
            acc[stat].push(quest);
            return acc;
        }, {});

        res.json(categorizedQuests);
    } catch (error: any) {
        console.error('Error fetching quests:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch quests' });
    }
});

// Route to accept a quest
app.post('/api/accept-quest', async (req, res) => {
    const { username, questId } = req.body;
    
    if (!username || !questId) {
        return res.status(400).json({ error: 'Username and questId are required' });
    }

    try {
        const result = await acceptQuest(username, questId);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error accepting quest:', error);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to accept quest',
            details: error.response?.data?.error || error.message
        });
    }
});

// Route to submit a quest
app.post('/api/submit-quest', async (req, res) => {
    const { questId, username } = req.body;

    if (!questId || !username) {
        return res.status(400).json({ error: 'Quest ID and username are required' });
    }

    try {
        // Get quest details first
        const questResponse = await axios.get(`${WORKER_URL}/quests?id=${questId}`);
        const quest = questResponse.data;

        if (!quest) {
            return res.status(404).json({ error: `Quest with ID ${questId} not found` });
        }

        // Then complete the quest
        await axios.post(`${WORKER_URL}/completed-quests`, {
            username,
            quest_id: questId
        });

        // Then update user's XP and levels
        const user = await fetchUserByName(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Make sure XP is parsed as an object
        user.xp = typeof user.xp === 'string' ? JSON.parse(user.xp) : user.xp;
        user.level = typeof user.level === 'string' ? JSON.parse(user.level) : user.level;
        user.levelRequirements = typeof user.levelRequirements === 'string' ? 
            JSON.parse(user.levelRequirements) : user.levelRequirements;

        // Update user stats
        const statToUpdate = quest.primaryStatGain.toLowerCase() as StatType;
        
        if (!isValidStat(statToUpdate)) {
            return res.status(400).json({ error: `Invalid stat to update: ${statToUpdate}` });
        }

        user.xp[statToUpdate] += quest.xp;
        user.xp.endurance += 10;

        // Level-up logic
        const currentStatLevel = user.level[statToUpdate];
        const requiredXp = user.levelRequirements[statToUpdate][currentStatLevel];
        if (user.xp[statToUpdate] >= requiredXp) {
            user.level[statToUpdate] += 1;
            user.xp[statToUpdate] = 0;
            user.xp.user += 1;
        }

        // Level-up logic for endurance
        const enduranceLevel = user.level.endurance;
        const enduranceRequiredXp = user.levelRequirements.endurance[enduranceLevel];
        if (user.xp.endurance >= enduranceRequiredXp) {
            user.level.endurance += 1;
            user.xp.endurance = 0;
            user.xp.user += 1;
        }

        const currentUserLevel = user.level.user;
        const userRequiredXp = user.levelRequirements.user[currentUserLevel];
        if (user.xp.user >= userRequiredXp) {
            user.level.user += 1;
            user.xp.user = 0;
        }

        // Save updated user data
        await updateUserByName(username, user);

        res.json({ 
            message: 'Quest submitted successfully', 
            user 
        });
    } catch (error: any) {
        console.error('Error in /api/submit-quest:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Failed to submit quest',
            details: error.response?.data || error.message
        });
    }
});

// Add a route to get accepted quests
app.get('/api/accepted-quests', async (req, res) => {
    const username = req.query.username as string;
    
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const response = await axios.get(`${WORKER_URL}/accepted-quests?username=${username}`);
        res.json(response.data);
    } catch (error: any) {
        console.error('Error fetching accepted quests:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ 
            error: 'Failed to fetch accepted quests',
            details: error.response?.data?.error || error.message
        });
    }
});

// Add this helper function
function isValidStat(stat: string): stat is StatType {
    return ['user', 'strength', 'agility', 'intelligence', 'wisdom', 'endurance'].includes(stat);
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
