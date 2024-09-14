import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleComplete, fetchTodos, editTodo } from '../features/todos/todoSlice';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos.todos);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Access darkMode from state

  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const userTodos = todos.filter(todo => todo.userEmail === currentUser?.email) || [];

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    } else {
      dispatch(fetchTodos());
    }
  }, [currentUser, dispatch, navigate]);

  const handleEditClick = (todo) => {
    setEditTodoId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleEditSubmit = (id) => {
    if (editTitle && editDescription) {
      dispatch(editTodo({
        id,
        title: editTitle,
        description: editDescription,
        completed: false,
        userEmail: currentUser.email
      }));
      toast.success('Updated successfully!');
      setEditTodoId(null);
      setEditTitle('');
      setEditDescription('');
    } else {
      toast.error('Title and description cannot be empty');
    }
  };

  return (
    <div className={`flex justify-center p-4 sm:p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`w-full max-w-4xl p-4 sm:p-6 mx-auto overflow-y-auto rounded-lg shadow-lg ${darkMode ? 'border border-gray-500' : ''}`} style={{ maxHeight: 'calc(55vh)', overflow: "auto" }}>
        <h1 className='mb-4 text-lg font-bold text-center sm:mb-6 sm:text-xl md:text-2xl'>My Todo List</h1>
        {currentUser ? (
          <div>
            {userTodos.length > 0 ? (
              userTodos.map((todo) => (
                <div key={todo.id} className={`p-4 sm:p-5 mb-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                  {editTodoId === todo.id ? (
                    <div className="flex flex-col space-y-4">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg focus:outline-none text-sm sm:text-base ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                        placeholder="Title"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg focus:outline-none text-sm sm:text-base ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                        placeholder="Description"
                        rows="2"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSubmit(todo.id)}
                          className="px-3 py-1 text-sm text-white bg-green-600 rounded-lg sm:text-base hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditTodoId(null)}
                          className="px-3 py-1 text-sm text-white bg-red-600 rounded-lg sm:text-base hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between space-y-0 sm:space-y-0">
                        <h4 className="font-bold text-md sm:text-lg">{todo.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs hidden sm:block sm:text-sm font-semibold ${todo.completed ? 'text-green-400' : 'text-red-400'}`}>
                            {todo.completed ? 'Completed' : 'Pending'}
                          </span>
                          <button
                            onClick={() => dispatch(toggleComplete(todo.id))}
                            className={`p-2 rounded-full text-xs sm:text-sm ${todo.completed ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
                          >
                            {todo.completed ? <FaCheckCircle size={16} /> : <FaCircle size={16} />}
                          </button>
                          <button
                            onClick={() => handleEditClick(todo)}
                            className={`p-2 transition duration-150 ease-in-out rounded-full hover:bg-gray-300 hover:text-blue-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => dispatch(deleteTodo(todo.id))}
                            className={`p-2 transition duration-150 ease-in-out rounded-full hover:bg-gray-300 hover:text-red-500 ${darkMode ? 'text-red-400' : 'text-red-600'}`}
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{todo.description}</p>


                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No todos found. Add some todos today!</p>
            )}
          </div>
        ) : (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Please log in to see your todos.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
