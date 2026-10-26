const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = {};

app.get('/load/:userId', (req, res) => {
    const { userId } = req.params;
    if (!db[userId]) {
        db[userId] = { score: 0, passive: 0, lastSync: Date.now() };
    }
    res.json(db[userId]);
});

app.post('/sync', (req, res) => {
    const { userId, score, passive } = req.body;
    
    if (!userId) return res.status(400).json({ error: 'Falta el ID' });

    db[userId] = { score, passive, lastSync: Date.now() };
    res.json({ success: true, data: db[userId] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
