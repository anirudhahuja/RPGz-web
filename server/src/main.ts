import express from 'express';
import cors from 'cors';


const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors());


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/api/user-info', (req, res) => {
  // Simulate fetching user data from a database
  const userData = {
    name: 'John Doe',
    level: 1,
    class: 'Novice',
    xp: '0/100',
    health: 100,
    stamina: 50,
    strength: 10,
    agility: 10,
    intelligence: 10,
    wisdom: 10,
    willpower: 1,
  };
  res.json(userData);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
