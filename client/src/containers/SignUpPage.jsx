import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/loginSignUp.scss';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); 

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        if (!passwordRegex.test(password)) {
            alert (
             "Please try again. Your password must include at least:\n" +
              "- One uppercase letter (A)\n" +
              "- One lowercase letter (a)\n" +
              "- One number (5)\n" +
              "- One special character (*)\n" +
              "- Minimum 10 characters in total." 
            );
            return false;
          }
          return true;
    }
}

const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(!validatePassword(password)){
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });
  
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Store the JWT token in localStorage after sign-up
        localStorage.setItem('authToken', data.token);  // Store token after successful sign-up
  
        console.log('Sign-up successful');
        navigate('/todos');  // Navigate to the Todo page after sign-up
      } else {
        if (data.error === 'Email already exists') {
          alert('This email is already registered. Please use a different email.')
        } else {
          alert(`Sign-up failed: ${data.error}`);
        }
         // Show error message if sign-up fails
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during sign-up. Please try again later.');
    }
  };