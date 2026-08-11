const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No tasks found' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to find the task' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title required' });
  }

  try {
    const newTask = await prisma.task.create({
      data: { title }
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);
  const { title, completed } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title, completed }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Task not found or delete failed' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});