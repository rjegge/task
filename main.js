// File name: main.js //

// Required modules
const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./utils/connectDB'); // Import the connectDB function
const app = express();
const PORT = 4000;

// Mongoose schema for tasks
const taskSchema = new mongoose.Schema({
  task: String,
  status: String
});

// Mongoose model for tasks
const Task = mongoose.model('Task', taskSchema);

// Invoke the connectDB function to establish the database connection
connectDB();

// Middleware and settings
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// GET route to render main page
app.get('/', async (req, res) => {
  try {
    let tasks = await Task.find({});
    tasks = tasks.map(task => ({ ...task._doc, idString: task._id.toString() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/', async (req, res) => {
//   const tasks = await Task.find({});
//   const tasksWithStringIds = tasks.map(task => ({ ...task._doc, idString: task._id.toString() }));
//   res.render('index', { tasks: tasksWithStringIds });
// });

// POST route to create a task
app.post('/create-task', async (req, res) => {
  const newTask = new Task({
    task: req.body.task,
    status: 'Incomplete'
  });
  
  await newTask.save();
  res.redirect('/');
});

// POST route to delete a task
app.post('/delete-task', async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.id);
  
  try {
    await Task.deleteOne({ _id: id });
    res.status(200).send('Task deleted');
  } catch (error) {
    res.status(400).send('Error deleting task');
  }
});

// POST route to edit a task
app.post('/edit-task', async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.id);
  const newTask = req.body.newTask;
  
  try {
    await Task.updateOne({ _id: id }, { task: newTask });
    res.status(200).send('Task updated');
  } catch (error) {
    res.status(400).send('Error updating task');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
