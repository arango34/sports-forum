import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const ProfileForm = ({ alertSuccess, currentUser }) => {
  const [values, setValues] = useState({
    username: currentUser.userName,
    email: currentUser.email,
  });

  const navigate = useNavigate();

  const { user, setLogbar, deleteUser, authFetch } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        (user.userName === values.username &&
          currentUser.email === values.email) ||
        values.email === '' ||
        values.username === ''
      )
        return;

      const { data } = await authFetch.patch(`/auth/user/${currentUser._id}`, {
        values,
      });

      user.userName = values.username;

      localStorage.removeItem('user');
      localStorage.removeItem('token');

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      setLogbar();

      alertSuccess();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleClick = () => {
    if (window.confirm('Are you sure')) {
      deleteUser(currentUser._id);
      navigate('/');
    }
  };

  return (
    <form className='profile-form' onSubmit={handleSubmit}>
      <div className='profile-form-container'>
        <div className='profile-row username-input-container'>
          <label htmlFor='username' className='g'>
            Username:{' '}
          </label>
          <input
            type='text'
            className='username-inp'
            name='username'
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className='profile-row profile-input-container'>
          <label htmlFor='email' className='g' value={values.email}>
            Email:{' '}
          </label>
          <input
            type='text'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='profile-btn-container'>
        <div className='width'></div>
        <button type='submit' className='btn-update update-btn'>
          Update
        </button>
        <div className='update-red'>
          <button type='button' className='btn btn-hover' onClick={handleClick}>
            <p>Delete</p>
            <p>Account</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
