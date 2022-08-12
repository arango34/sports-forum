import React from 'react';

import './UserContainer.css';

const UserContainer = ({ isMember, setIsMember }) => {
  return (
    <div className='login-users-container'>
      <p className='users-container-p'>
        Create account{' '}
        <span className='here blue' onClick={() => setIsMember(!isMember)}>
          here
        </span>{' '}
        or choose user from below.
      </p>
      <div className='users-container'>
        <div className='container-user'>
          <span className='bracket'>{'{ '}</span>
          <div>
            <span className='login-key'>Username: </span>
            <span className='login-val'>kevinA</span>
          </div>
          <div>
            <span className='login-key'>Password: </span>
            <span className='login-val'>secret</span>
          </div>
          <span className='bracket'>{' }'}</span>
        </div>
        <div className='container-user'>
          <span className='bracket'>{'{ '}</span>
          <div>
            <span className='login-key'>Username: </span>
            <span className='login-val'>kevinB</span>
          </div>
          <div>
            <span className='login-key'>Password: </span>
            <span className='login-val'>secret</span>
          </div>
          <span className='bracket'>{' }'}</span>
        </div>
        <div className='container-user'>
          <span className='bracket'>{'{ '}</span>
          <div>
            <span className='login-key'>Username: </span>
            <span className='login-val'>kevinC</span>
          </div>
          <div>
            <span className='login-key'>Password: </span>
            <span className='login-val'>secret</span>
          </div>
          <span className='bracket'>{' }'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
