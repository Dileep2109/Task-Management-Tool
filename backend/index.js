const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// To Create SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE tasks (id TEXT, name TEXT, description TEXT, dueDate TEXT, status TEXT, priority TEXT, assignedTo TEXT)');
  db.run('CREATE TABLE comments (id INTEGER PRIMARY KEY, taskId TEXT, comment TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');
});

// Add comments
app.post('/comments', (req, res) => {
  const { taskId, comment } = req.body;
  db.run('INSERT INTO comments (taskId, comment) VALUES (?, ?)', [taskId, comment], function(err) {
    if (err) {
      console.error('Error adding comment:', err.message);
      res.status(500).send(err.message);
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
