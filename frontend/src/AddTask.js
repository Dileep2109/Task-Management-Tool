import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './store';
import { Form, Button, Header, Input, Select } from 'semantic-ui-react';

const statusOptions = [
  { key: 'pending', text: 'Pending', value: 'pending' },
  { key: 'in-progress', text: 'In Progress', value: 'in-progress' },
  { key: 'completed', text: 'Completed', value: 'completed' },
];

const priorityOptions = [
  { key: 'low', text: 'Low', value: 'low' },
  { key: 'medium', text: 'Medium', value: 'medium' },
  { key: 'high', text: 'High', value: 'high' },
];

function AddTask() {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'low',
    assignedTo: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e, { name, value }) => {
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...task, id: Date.now().toString() };
    dispatch(addTask(newTask));
    setTask({
      name: '',
      description: '',
      dueDate: '',
      status: 'pending',
      priority: 'low',
      assignedTo: ''
    });
    console.log('Task added:', newTask);
  };

  return (
    <Form onSubmit={handleSubmit} className="max-w-md mx-auto p-5">
      <Header as="h2" textAlign="center" className="mb-4">Add New Task</Header>
      <Form.Field
        control={Input}
        label="Task Name"
        name="name"
        value={task.name}
        onChange={handleChange}
        placeholder="Task Name"
        required
      />
      <Form.Field
        control={Input}
        label="Task Description"
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <Form.Field
        control={Input}
        label="Due Date"
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <Form.Field
        control={Select}
        label="Status"
        name="status"
        options={statusOptions}
        value={task.status}
        onChange={handleChange}
      />
      <Form.Field
        control={Select}
        label="Priority"
        name="priority"
        options={priorityOptions}
        value={task.priority}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label="Assign to User"
        name="assignedTo"
        value={task.assignedTo}
        onChange={handleChange}
        placeholder="Assign to User"
      />
      <Button type="submit" primary fluid>
        Add Task
      </Button>
    </Form>
  );
}

export default AddTask;
