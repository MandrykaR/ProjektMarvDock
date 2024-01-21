const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

// Create a Sequelize instance and connect to the SQLite database 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
});

// Define the CHAR model 
const CHAR = sequelize.define('CHAR', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    img: {
        type: DataTypes.STRING,
    },
});

// Synchronize the model with the database (create the table if it doesn't exist) 
sequelize.sync();

// Middleware to parse JSON requests 
app.use(express.json());

// CRUD operations 

// Create a new CHAR 
app.post('/chars', async (req, res) => {
    try {
        const char = await CHAR.create(req.body);
        res.json({ id: char.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all CHARS 
app.get('/chars', async (req, res) => {
    try {
        const chars = await CHAR.findAll();
        res.json(chars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific CHAR by ID 
app.get('/chars/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const char = await CHAR.findByPk(id);
        if (!char) {
            return res.status(404).json({ error: 'CHAR not found' });
        }
        res.json(char);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a CHAR by ID 
app.put('/chars/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [updatedRows] = await CHAR.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'CHAR not found' });
        }
        res.json({ message: 'CHAR updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a CHAR by ID 
app.delete('/chars/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedRows = await CHAR.destroy({ where: { id } });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'CHAR not found' });
        }
        res.json({ message: 'CHAR deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});