import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Spinner from './Spinner';

import './LoginBar.css';

const LoginBar = () => {
  const { user, logoutUser, changeLogbar, setShowLinksFalse } = useAppContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const timeout = setTimeout(() => {
        setCurrentUser(user);
        setIsLoading(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setCurrentUser(user);
      setIsLoading(false);
    }
  }, [logoutUser, user, changeLogbar]);

  return (
    <div className='loginbar' onClick={setShowLinksFalse}>
      {isLoading ? (
        <div className='login login-user login-spin'>
          <Spinner className='spinner-load' />
        </div>
      ) : !user || !currentUser ? (
        <div className='login'>
          {location.pathname === '/login' ? (
            ''
          ) : location.pathname === '/register' ? (
            ''
          ) : (
            <span>
              {
                <Link to={'/login'} className='blue'>
                  Log in or Register
                </Link>
              }
            </span>
          )}
        </div>
      ) : (
        <div className='login login-user'>
          <p>
            <span className='black'>Logged in as </span>
            <Link to={`/profile/${currentUser._id}`} className='blue'>
              {user ? user.userName : currentUser.userName}
            </Link>
          </p>
          <Link to='/' className='btn-logout' onClick={logoutUser}>
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginBar;
