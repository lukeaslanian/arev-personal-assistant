const axios = require('axios');

let tasks = [];

async function addTask(title, dueDate) {
  const taskFeatures = [/* Extract features from title and dueDate */];

  // Call the Python service for priority prediction
  const response = await axios.post('http://python-service:5000/predict', {
    features: taskFeatures,
  });

  const priority = Math.round(response.data.priority);

  const task = {
    id: tasks.length + 1,
    title,
    priority,
    dueDate,
  };

  tasks.push(task);
  return task;
}

function getTasks() {
  return tasks;
}

module.exports = { addTask, getTasks };
