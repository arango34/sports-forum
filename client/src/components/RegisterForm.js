import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import './LoginForm.css';

const initialState = {
  userName: '',
  password: '',
  email: '',
};

const RegisterForm = () => {
  const [state, setState] = useState(initialState);
  const btn = useRef();
  const navigate = useNavigate();

  const { registerUser, user } = useAppContext();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    btn.current.disabled = true;

    const { userName, email, password } = state;

    const currentUser = { userName, email, password };

    registerUser(currentUser);
  };

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      const timeout = setTimeout(() => {
        btn.current.disabled = false;
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [user, navigate, registerUser]);

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <label htmlFor='email' className='email'>
          Email:{' '}
        </label>
        <input
          type='text'
          name='email'
          className='login-input input-email'
          onChange={handleChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='userName'>Username: </label>
        <input
          type='text'
          name='userName'
          className='login-input'
          onChange={handleChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password' className='password-label'>
          Password:{' '}
        </label>
        <input
          type='password'
          name='password'
          className='login-input'
          onChange={handleChange}
        />
      </div>
      <div className='btn-login-container'>
        <button type='submit' className='btn btn-login' ref={btn}>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
