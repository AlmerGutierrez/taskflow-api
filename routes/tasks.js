const express = require('express');
const fs = require('fs');
const path = require('path');
const validateTask = require('../middleware/validate');
const router = express.Router();

const DB_PATH = path.join(__dirname, '..', 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

router.get('/', (req, res) => {
  const db = readDB();
  let tasks = db.tasks;

  if (req.query.completed !== undefined) {
    const wanted = req.query.completed === 'true';
    tasks = tasks.filter(t => t.completed === wanted);
  }

  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    tasks = tasks.filter(t => t.title.toLowerCase().includes(term));
  }

  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const db = readDB();
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
});

router.post('/', validateTask, (req, res) => {
  const db = readDB();
  const newTask = {
    id: Date.now().toString(),
    title: req.body.title,
    completed: false,
    createdAt: new Date().toString()
  };
  db.tasks.push(newTask);
  writeDB(db);
  res.status(201).json(newTask);
});

router.put('/:id', validateTask, (req, res) => {
  const db = readDB();
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  Object.assign(task, req.body);
  writeDB(db);
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const db = readDB();
  const index = db.tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  db.tasks.splice(index, 1);
  writeDB(db);
  res.status(204).send();
});

module.exports = router;
