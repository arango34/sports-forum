import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import './LoginForm.css';

const initialState = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [state, setState] = useState(initialState);
  const { loginUser, user } = useAppContext();
  const btn = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    btn.current.disabled = true;

    const { username, password } = state;

    const currentUser = { userName: username, password };

    loginUser(currentUser);
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
  }, [user, navigate, loginUser]);

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
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
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
