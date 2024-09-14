import React from 'react';
import { useSelector } from 'react-redux';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const TodoPage = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div style={{ height: 'calc(100vh - 34px)' }} className={`flex flex-col  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`flex-1  ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoPage;
