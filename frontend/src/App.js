import React from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { Container } from 'semantic-ui-react';
import './App.css';


function App() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
      <AddTask />
      <TaskList />
    </Container>
  );
}

export default App;
