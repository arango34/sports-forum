import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import './Error.css';

const Error = () => {
  const { setShowLinksFalse } = useAppContext();
  return (
    <section className='error-section' onClick={setShowLinksFalse}>
      <div className='error-container'>
        <h1 className='error-h1'>Page not found</h1>
        <Link to='/' className='home-link'>
          <div className='btn-error'>Back Home</div>
        </Link>
      </div>
    </section>
  );
};

export default Error;
