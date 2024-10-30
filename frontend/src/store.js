import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.warn('Failed to load tasks from local storage:', error);
    return [];
  }
};

const saveToLocalStorage = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedTasks);
  } catch (error) {
    console.warn('Failed to save tasks to local storage:', error);
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadFromLocalStorage(),
  reducers: {
    // Action to add a new task
    addTask: (state, action) => {
      const updatedTasks = [...state, action.payload];
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    },
    updateTask: (state, action) => {
      const updatedTasks = state.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter(task => task.id !== action.payload);
      saveToLocalStorage(updatedTasks);
      return updatedTasks;
    }
  }
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
});
