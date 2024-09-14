import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  todos: [], 
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo, { getState }) => {
    const { currentUser } = getState().auth;

    if (!currentUser) {
      throw new Error('User must be logged in to add todos'),
      toast.error(' User must be logged to add todos!')
    }

    const newTodo = { ...todo, userEmail: currentUser.email };
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));
    return newTodo;
  }
);

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async (updatedTodo, { getState }) => {
    const { currentUser } = getState().auth;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    if (!currentUser) {
      throw new Error('User must be logged in to edit todos');
      toast.error(' User must be logged to add todos!')

    }

    const index = todos.findIndex(todo => todo.id === updatedTodo.id && todo.userEmail === currentUser.email);
    if (index === -1) throw new Error('Todo not found');

    todos[index] = updatedTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
    return updatedTodo;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { getState }) => {
    const { currentUser } = getState().auth;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    if (!currentUser) {
      throw new Error('User must be logged in to delete todos'),
      toast.error(' User must be logged to add todos!')

    }

    const filteredTodos = todos.filter(todo => todo.id !== id || todo.userEmail !== currentUser.email);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
    toast.success('Deleted succesully')
    return id;
  }
);

export const toggleComplete = createAsyncThunk(
  'todos/toggleComplete',
  async (id, { getState }) => {
    const { currentUser } = getState().auth;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    if (!currentUser) {
      throw new Error('User must be logged in to toggle todos');
    }

    const index = todos.findIndex(todo => todo.id === id && todo.userEmail === currentUser.email);
    if (index === -1) throw new Error('Todo not found');

    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    toast.success('Succesully changed ')

    return todos[index];
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index >= 0) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index >= 0) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
