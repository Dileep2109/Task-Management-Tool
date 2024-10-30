import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, deleteTask } from './store';
import { List, Dropdown, Input, Button, Container, Header, Icon } from 'semantic-ui-react';

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentChange = (taskId, value) => {
    setCommentInputs({ ...commentInputs, [taskId]: value });
  };

  const handleAddComment = (task) => {
    const newComment = commentInputs[task.id];
    if (newComment) {
      const updatedTask = { ...task, comments: [...(task.comments || []), newComment] };
      dispatch(updateTask(updatedTask));
      setCommentInputs({ ...commentInputs, [task.id]: '' });
    }
  };

  const handleDeleteComment = (task, commentIndex) => {
    const updatedTask = {
      ...task,
      comments: task.comments.filter((_, index) => index !== commentIndex),
    };
    dispatch(updateTask(updatedTask));
  };

  const handleStatusChange = (task, status) => {
    const updatedTask = { ...task, status };
    dispatch(updateTask(updatedTask));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.search || task.name.includes(filters.search) || task.description.includes(filters.search))
    );
  });

  return (
    <Container style={{ marginTop: '20px' }}>
      <Input
        placeholder="Search tasks..."
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      <Dropdown
        placeholder='All Statuses'
        selection
        options={[
          { key: 'all', text: 'All Statuses', value: '' },
          { key: 'pending', text: 'Pending', value: 'pending' },
          { key: 'in-progress', text: 'In Progress', value: 'in-progress' },
          { key: 'completed', text: 'Completed', value: 'completed' }
        ]}
        onChange={(e, { value }) => setFilters({ ...filters, status: value })}
        style={{ marginBottom: '10px' }}
      />
      <Dropdown
        placeholder='All Priorities'
        selection
        options={[
          { key: 'all', text: 'All Priorities', value: '' },
          { key: 'low', text: 'Low', value: 'low' },
          { key: 'medium', text: 'Medium', value: 'medium' },
          { key: 'high', text: 'High', value: 'high' }
        ]}
        onChange={(e, { value }) => setFilters({ ...filters, priority: value })}
        style={{ marginBottom: '20px' }}
      />
      <List divided relaxed>
        {filteredTasks.map((task) => (
          <List.Item key={task.id} style={{ padding: '20px', backgroundColor: '#f9f9f9', marginBottom: '10px', borderRadius: '10px' }}>
            <List.Content>
              <Header as="h3" style={{ fontWeight: 'bold' }}>{task.name}</Header>
              <List.Description>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due:</strong> {task.dueDate}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Assigned to:</strong> {task.assignedTo}</p>
              </List.Description>
              <Dropdown
                value={task.status}
                options={[
                  { key: 'pending', text: 'Pending', value: 'pending' },
                  { key: 'in-progress', text: 'In Progress', value: 'in-progress' },
                  { key: 'completed', text: 'Completed', value: 'completed' }
                ]}
                onChange={(e, { value }) => handleStatusChange(task, value)}
                style={{ marginTop: '10px', marginRight: '10px' }}
              />
              <Button onClick={() => handleDelete(task.id)} color='red' style={{ marginTop: '10px' }}>Delete</Button>
              <Input
                placeholder='Add a comment...'
                value={commentInputs[task.id] || ''}
                onChange={(e) => handleCommentChange(task.id, e.target.value)}
                style={{ marginTop: '10px' }}
              />
              <Button onClick={() => handleAddComment(task)} color='blue' style={{ marginTop: '10px' }}>Add Comment</Button>
              {Array.isArray(task.comments) && task.comments.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <Header as="h4" style={{ fontWeight: 'bold' }}>Comments:</Header>
                  {task.comments.map((comment, index) => (
                    <div key={index} style={{ marginTop: '5px', padding: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{comment}</span>
                      <Icon
                        name="delete"
                        onClick={() => handleDeleteComment(task, index)}
                        style={{ cursor: 'pointer', color: 'red' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}

export default TaskList;
