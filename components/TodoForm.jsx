import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import { toast } from 'react-toastify';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(addTodo({
        id: Date.now(),
        title,
        description,
        completed: false,
        userEmail: currentUser.email,
      }));
      toast.success("Added successfully");
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className={`w-full py-4 px-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} md:px-0`}>
      <form 
        onSubmit={handleSubmit} 
        className={`max-w-xl p-6 mx-auto ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} border rounded-lg shadow-md`}
      >
        <div className="mt-0 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-white' : 'bg-white text-black border-gray-300 focus:ring-black'} focus:ring-2`}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="2"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-white' : 'bg-white text-black border-gray-300 focus:ring-black'} focus:ring-2`}
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-3 font-semibold text-white bg-black rounded-lg shadow hover:bg-gray-900`}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
