import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import TodoPage from './containers/TodoPage';
import './assets/styles/todoMain.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos" element={<TodoPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
