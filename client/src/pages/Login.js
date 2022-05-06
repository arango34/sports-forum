import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Loading from '../components/Loading';
import Spinner from '../components/Spinner';

import './Login.css';
import { useAppContext } from '../context/appContext';

const Login = () => {
  const [isMember, setIsMember] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { showSpin, alert, alertText } = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [isMember]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='login-section'>
      <h3 className='h4-login'>
        {isMember ? 'Member Login' : 'Create An Account'}
      </h3>
      <div className='loading-container'>
        <div className={!showSpin && !alert ? 'spin-hidden' : ''}>
          {showSpin ? <Spinner /> : <div className='red'>{alertText}</div>}
        </div>
      </div>
      {isMember ? <LoginForm /> : <RegisterForm />}

      <div className='login-p'>
        <span className='login-span' onClick={() => setIsMember(!isMember)}>
          {isMember ? 'Not A Member?' : 'Log In'}
        </span>
      </div>
    </section>
  );
};

export default Login;
