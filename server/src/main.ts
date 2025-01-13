import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { fetchUsers, addUser, fetchUserByName, updateUserByName } from './workerService'; // Import functions
const WORKER_URL = 'https://fitness-rpg-service.ani-ahuja219.workers.dev';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
});

// Route to fetch all users from the Worker
app.get('/api/users', async (req, res) => {
    try {
        const users = await fetchUsers();
        res.json(users);
    } catch (error) {
        console.error('Error in /api/users route:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// Route to save a new user to the database via the Worker
app.post('/api/save-user', async (req, res) => {
    const userData = req.body;

    // Validate required fields
    if (!userData.name || !userData.class) {
        return res.status(400).json({ error: 'Name and class are required' });
    }

    try {
        // Save user data to the database (stringify only when saving)
        await addUser({
            ...userData,
            level: JSON.stringify(userData.level),
            xp: JSON.stringify(userData.xp),
            levelRequirements: JSON.stringify(userData.levelRequirements),
        });

        res.status(201).json({ message: 'User saved successfully' });
    } catch (error: any) {
        console.error('Error saving user:', error.message || error);
        res.status(500).json({ error: 'Failed to save user' });
    }
});


// Route to fetch specific user info by name
app.get('/api/user-info', async (req, res) => {
    const userName = req.query.name as string;

    if (!userName) {
        return res.status(400).json({ error: 'User name is required' });
    }

    try {
        const result = await fetchUserByName(userName);
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
        // Use the existing /quests route in the Worker
        const response = await axios.get(`${WORKER_URL}/quests`); 
        const quests = response.data;

        // Group quests by primaryStatGain
        const categorizedQuests = quests.reduce((acc: any, quest: any) => {
            const stat = quest.primaryStatGain.toLowerCase();
            if (!acc[stat]) {
                acc[stat] = [];
            }
            acc[stat].push(quest);
            return acc;
        }, {});

        res.json(categorizedQuests); // Send the categorized quests to the frontend
    } catch (error: any) {
        console.error('Error fetching quests:', error.response?.data || error.message || error);
        res.status(500).json({ error: 'Failed to fetch quests' });
    }
});


// Route to submit a quest
app.post('/api/submit-quest', async (req, res) => {
    const { questId, name } = req.body;

    if (!questId || !name) {
        return res.status(400).json({ error: 'Quest ID and user name are required' });
    }

    try {
        // Fetch the user from the database
        const user = await fetchUserByName(name);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Parse xp, level, and levelRequirements if they are still strings
        user.xp = typeof user.xp === 'string' ? JSON.parse(user.xp) : user.xp;
        user.level = typeof user.level === 'string' ? JSON.parse(user.level) : user.level;
        user.levelRequirements = typeof user.levelRequirements === 'string' ? JSON.parse(user.levelRequirements) : user.levelRequirements;

        // Fetch the specific quest by questId
        const questResponse = await axios.get(`${WORKER_URL}/quests?id=${questId}`);
        const quest = questResponse.data;

        if (!quest) {
            return res.status(404).json({ error: `Quest with ID ${questId} not found` });
        }

        // Normalize statToUpdate and user XP keys
        const statToUpdate = quest.primaryStatGain.toLowerCase();

        if (user.xp[statToUpdate] === undefined) {
            return res.status(400).json({ error: `Invalid stat to update: ${statToUpdate}` });
        }

        // Update user's XP and stats
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
        await updateUserByName(name, user);

        res.json({ message: 'Quest submitted successfully', user });
    } catch (error: any) {
        console.error('Error in /api/submit-quest:', error.message || error);
        res.status(500).json({ error: 'Failed to submit quest' });
    }
});


app.listen(port, host, () => {
	console.log(`[ ready ] http://${host}:${port}`);
});
