const express = require('express');
const fs = require('fs');
const path = require('path');
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
  res.json(db.tasks);
});

router.get('/:id', (req, res) => {
  const db = readDB();
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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
