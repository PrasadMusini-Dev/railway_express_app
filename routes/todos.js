const express = require('express');
const { db } = require('../db/db');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM railyway');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching todos');
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).send('Todo content is required');
  }

  try {
    await db.query('INSERT INTO railyway (todo) VALUES (?)', [todo]);
    res.status(200).json({
      message: 'Todo added successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding todo');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM railyway WHERE todo_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Todo not found');
    }
    await db.query('DELETE FROM railyway WHERE todo_id = ?', [id]);
    res.status(200).json({
      message: 'Todo deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting todo');
  }
});

module.exports = router;
