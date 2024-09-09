const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas Connection URI
const uri = "mongodb+srv://MULLAIVENDAN:FZWcHlzYPXi48m1o@cluster0.4rrex.mongodb.net/student_tasks?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  courseId: String,
  taskName: String,
  dueDate: String,
  details: String,
});

const Task = mongoose.model('Task', taskSchema);

// Route to add a task
app.post('/add-task', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(200).json({ success: true, message: 'Task added successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding task.' });
    }
});

// Route to retrieve all tasks
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find({});
      if (tasks.length === 0) {
        return res.status(404).json({ success: false, message: 'No tasks found.' });
      }
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving tasks.' });
    }
});

// Route to delete a task
app.delete('/delete-task/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const result = await Task.findByIdAndDelete(taskId);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Task not found.' });
      }
      res.status(200).json({ success: true, message: 'Task deleted successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting task.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});