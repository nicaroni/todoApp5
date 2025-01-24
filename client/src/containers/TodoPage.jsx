//   # Todo app page (integrates TodoList, TodoForm)

import React, { useReducer, useEffect, Suspense, useState  } from "react";
import todoReducer, { initialState } from "../context/TodoReducer";
import axios from "axios";
import '../assets/styles/todoMain.scss';

// Lazy load the TodoList component
const TodoList = React.lazy(() => import('../components/TodoList'));

const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [showCompleted, setShowCompleted] = useState(false);

  // Fetch all todos from the server on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/todos", {
          header: {
            Authorization: `Bearer ${token}`,
          },
        });
       // Filter the todos into completed and uncompleted
       const completedTodos = response.data.filter(todo => todo.completed);
       const uncompletedTodos = response.data.filter(todo => !todo.completed);
       
       // Dispatch both completed and uncompleted todos
       dispatch({ type: "SET_TODOS", payload: { completedTodos, uncompletedTodos } });

     } catch (err) {
       console.error("Error fetching todos:", err);
     }
   } else {
     console.log("No token found, user might not be authenticated");
   }
 };

    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Todo App</h1>
      <Suspense fallback={<div>Loading List...</div>}>
        <TodoList todos={todos} dispatch={dispatch} />
      </Suspense>
    </div>
  );
};

export default TodoApp;
