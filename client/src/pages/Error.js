import { Link } from 'react-router-dom';

import './Error.css';

const Error = () => {
  return (
    <section className='error-section'>
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
