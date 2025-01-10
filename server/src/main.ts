import express from 'express';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
});

// Define a single user object
const user = {
  name: 'John Doe',
  class: 'Novice',
  health: 100,
  stamina: 50,
  level: {
    user: 1,
    strength: 1,
    agility: 1,
    intelligence: 1,
    wisdom: 1,
    endurance: 1,
  },
  xp: {
    user: 5,
    strength: 0,
    agility: 0,
    intelligence: 0,
    wisdom: 0,
    endurance: 0,
  },
  levelRequirements: {
    user: [0, 8, 12, 16, 22],
    strength: [0, 60, 100, 140, 200],
    agility: [0, 60, 100, 140, 200],
    intelligence: [0, 60, 100, 140, 200],
    wisdom: [0, 60, 100, 140, 200],
    endurance: [0, 60, 100, 150, 200],
  }
};

// Endpoint to get user info
app.get('/api/user-info', (req, res) => {
  res.json(user);
});

app.post('/api/submit-quest', (req, res) => {
  const { questId } = req.body;

  // Find the quest by ID
  const quest = Object.values(questsData).flat().find(q => q.id === questId);
  if (!quest) {
    return res.status(404).json({ message: 'Quest not found' });
  }

  // Update the user's stats
  const statToUpdate = quest.primaryStatGain.toLowerCase();
  if (user.xp[statToUpdate] !== undefined) {
    user.xp[statToUpdate] += quest.xp;
    user.xp["endurance"] += 10;

    // Check if the user has reached the next level for the stat
    const currentStatLevel = user.level[statToUpdate];
    const requiredStatXp = user.levelRequirements[statToUpdate][currentStatLevel];

    if (user.xp[statToUpdate] >= requiredStatXp) {
      user.level[statToUpdate] += 1;
      user.xp[statToUpdate] = 0;
      user.xp["user"] += 1;
    }

    // Check if the user has reached the next level for endurance
    const currentEnduranceLevel = user.level["endurance"];
    const requiredEnduranceXp = user.levelRequirements["endurance"][currentEnduranceLevel];

    if (user.xp["endurance"] >= requiredEnduranceXp) {
      user.level["endurance"] += 1;
      user.xp["endurance"] = 0;
      user.xp["user"] += 1;
    }

    // Check if the user has reached the next level for the User
    const userLevel = user.level["user"];
    const requiredUserXp = user.levelRequirements["user"][userLevel];

    if (user.xp["user"] >= requiredUserXp) {
      user.level["user"] += 1;
    }

  } else {
    return res.status(400).json({ message: 'Invalid stat to update' });
  }

  res.json({ message: 'Quest submitted and experience updated successfully', user });
});

// Quests Data
const questsData = {
  strength: [
    { id: 101, name: "Dragon's Push-Up Challenge", description: "Prove your might with bodyweight push-ups.", primaryStatGain: "Strength", xp: 20 },
    { id: 102, name: "Iron Squat Trials", description: "Test your lower-body power with squats.", primaryStatGain: "Strength", xp: 20 },
    { id: 103, name: "Fortress Plank Endurance", description: "Strengthen your core's defenses via the plank.", primaryStatGain: "Strength", xp: 20 },
    { id: 104, name: "Goblet Squat Guard Duty", description: "Hold a weight at chest level and squat like a vigilant guard.", primaryStatGain: "Strength", xp: 20 },
    { id: 105, name: "Weighted Lunge March", description: "March forward with lunges to build leg and core strength.", primaryStatGain: "Strength", xp: 20 },
    { id: 106, name: "Shield Press", description: "Simulate lifting a shield overhead for upper-body strength.", primaryStatGain: "Strength", xp: 20 },
    { id: 107, name: "Bent-Over Row Brigade", description: "Strengthen your back with pulling movements.", primaryStatGain: "Strength", xp: 20 },
    { id: 108, name: "Dip of Determination", description: "Bodyweight dips challenge your triceps and chest.", primaryStatGain: "Strength", xp: 20 },
    { id: 109, name: "Sledgehammer Slams", description: "Simulate forging a mighty sword by slamming a sledgehammer onto a tire.", primaryStatGain: "Strength", xp: 20 },
    { id: 110, name: "Farmers' Walk Caravan", description: "Carry heavy weights like a traveling merchant hauling goods.", primaryStatGain: "Strength", xp: 20 },
  ],
  agility: [
    { id: 201, name: "Lightning Sprint Trials", description: "Short bursts of speed to enhance explosive agility.", primaryStatGain: "Agility", xp: 20 },
    { id: 202, name: "Ladder Drills of the Rogue", description: "Footwork drills using an agility ladder.", primaryStatGain: "Agility", xp: 20 },
    { id: 203, name: "Plyometric Box Jumps", description: "Explosive jumps onto a sturdy box or platform.", primaryStatGain: "Agility", xp: 20 },
    { id: 204, name: "Side-to-Side Skater Hops", description: "Improve lateral movement and balance.", primaryStatGain: "Agility", xp: 20 },
    { id: 205, name: "Jump Rope Blitz", description: "Rapid rope skipping for foot speed and coordination.", primaryStatGain: "Agility", xp: 20 },
    { id: 206, name: "Bear Crawl Maneuvers", description: "Quick crawling on hands and feet for agility and functional strength.", primaryStatGain: "Agility", xp: 20 },
    { id: 207, name: "Cone Dribble Dash (Sporty)", description: "Weave in and out of cones while dribbling a ball.", primaryStatGain: "Agility", xp: 20 },
    { id: 208, name: "Shuttle Run Siege", description: "Quick bursts between markers to mimic messenger runs.", primaryStatGain: "Agility", xp: 20 },
    { id: 209, name: "Step-Up Surge", description: "Rapid step-ups onto a platform for coordination and speed.", primaryStatGain: "Agility", xp: 20 },
    { id: 210, name: "Shadow Boxing Footwork", description: "Combine boxing combos with pivots to enhance agility.", primaryStatGain: "Agility", xp: 20 },
  ],
  intelligence: [
    { id: 301, name: "Arcane Form Check", description: "Slow down and analyze your exercise technique in detail.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 302, name: "New Skill Study", description: "Learn a brand-new exercise (kettlebell swing, handstand, etc.).", primaryStatGain: "Intelligence", xp: 20 },
    { id: 303, name: "Mind-Muscle Meditation", description: "Combine mental focus with slow, controlled movements.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 304, name: "Nutritional Knowledge Gathering", description: "Spend time researching and planning healthy meals.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 305, name: "Yoga Alignment Workshop", description: "Carefully learn each posture's alignment.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 306, name: "Form Correction Collab", description: "Partner session to correct each other's form on lifts.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 307, name: "Technique Templars: Video Analysis", description: "Film yourself, then review and dissect form.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 308, name: "Learning a Complex Lift (Clean & Jerk, etc.)", description: "Step-by-step breakdown of an Olympic lift.", primaryStatGain: "Intelligence", xp: 20 },
    { id: 309, name: "Balance & Coordination Study", description: "Practice balancing exercises (single-leg stance, stability ball).", primaryStatGain: "Intelligence", xp: 20 },
    { id: 310, name: "Reading & Applying Workout Science", description: "Read articles/books on exercise science, then apply one principle.", primaryStatGain: "Intelligence", xp: 20 },
  ],
  wisdom: [
    { id: 401, name: "Nutrition Label Decipherer", description: "Examine labels on daily foods to learn about serving sizes, macros, hidden sugars.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 402, name: "Food Group Fundamentals", description: "Understand main food groups and create a balanced meal plan.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 403, name: "Macro Management Mission", description: "Learn about proteins, carbs, fats, and track macros for a day/meal.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 404, name: "Culinary Explorer", description: "Find and cook a new nutritious recipe.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 405, name: "Hydration Blueprint", description: "Investigate proper hydration practices and track your intake.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 406, name: "Calorie Counting 101", description: "Learn the basics of calorie intake for weight management.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 407, name: "Healthy Eating Mythbuster", description: "Research 2-3 popular diet myths and find the facts.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 408, name: "Dietary Experimentation", description: "Try a structured eating approach for a short period to see how your body reacts.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 409, name: "Grocery Strategy", description: "Plan a grocery list focusing on healthy staples, then shop according to plan.", primaryStatGain: "Wisdom", xp: 20 },
    { id: 410, name: "Meal Prep Mastery", description: "Cook meals in advance to ensure consistent nutrition.", primaryStatGain: "Wisdom", xp: 20 },
  ]
//   endurance: [
//     { id: 501, name: "Fire-Forged Finishers", description: "Add a tough finisher at the end of your workout.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 502, name: "Cold Shower Trial", description: "End your shower with cold water for 30-60s.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 503, name: "High-Rep Challenge", description: "Pick a bodyweight exercise and aim for a high rep count in one set.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 504, name: "Tabata Torture", description: "Intense 4-min interval protocol (20s on, 10s off x 8).", primaryStatGain: "Willpower", xp: 20 },
//     { id: 505, name: "Long Plank Hold", description: "Hold a single extended plank to test mental grit.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 506, name: "No-Snack Self-Control Day", description: "Avoid snacks/junk for a full day to practice dietary discipline.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 507, name: "Marathon Mindset", description: "Add 15-20 extra minutes (or an extra exercise) to your normal workout.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 508, name: "Early Morning Rise & Grind", description: "Wake up 30 min earlier for a morning workout or walk.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 509, name: "Cheat-Day Control", description: "Allow one indulgence (favorite treat), but stick to one portion.", primaryStatGain: "Willpower", xp: 20 },
//     { id: 510, name: "Last-Set Grind", description: "On the final set of any exercise, add 2 more reps beyond your planned target.", primaryStatGain: "Willpower", xp: 20 },
//   ],
};

// Quests Endpoint
app.get('/api/quests', (req, res) => {
  res.json(questsData);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
