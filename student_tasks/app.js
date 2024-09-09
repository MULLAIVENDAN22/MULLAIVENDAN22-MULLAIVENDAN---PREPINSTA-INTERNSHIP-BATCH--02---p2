document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const courseId = document.getElementById('courseId').value;
  const taskName = document.getElementById('taskName').value;
  const dueDate = document.getElementById('dueDate').value;
  const details = document.getElementById('details').value;

  const task = { courseId, taskName, dueDate, details };

  try {
    const response = await fetch('http://localhost:3000/add-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    const result = await response.json();

    if (result.success) {
      alert('Task added successfully!');
      fetchTasks(); // Fetch tasks after adding a new one
    } else {
      alert('Error adding task.');
    }
  } catch (err) {
    console.error('Error adding task:', err);
  }
});

// Function to fetch tasks and display them
async function fetchTasks() {
  try {
      const response = await fetch('http://localhost:3000/tasks');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const result = await response.json();

      // Check if the response indicates success and if tasks are present
      if (result.success) {
          if (result.tasks.length > 0) {
              displayTasks(result.tasks);
          } else {
              document.getElementById('taskList').innerHTML = 'No tasks found.';
          }
      } else {
          document.getElementById('taskList').innerHTML = 'No tasks found.';
      }
  } catch (err) {
      console.error('Error fetching tasks:', err);
      document.getElementById('taskList').innerHTML = 'No tasks found.';
  }
}


// Function to display tasks in the UI
function displayTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.innerHTML = `
      <h4>Task: ${task.taskName}</h4>
      <p>Due Date: ${task.dueDate}</p>
      <p>Details: ${task.details}</p>
      <button onclick="deleteTask('${task._id}')">Delete</button>
      <hr>
    `;
    taskList.appendChild(taskItem);
  });
}

// Function to delete a task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:3000/delete-task/${taskId}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.success) {
      alert('Task deleted successfully!');
      fetchTasks(); // Fetch tasks after deleting one
    } else {
      alert('Error deleting task.');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

// Fetch tasks when the page loads
window.onload = function() {
  fetchTasks(); // Call fetchTasks to display tasks on page load
};
