import { ImBubble } from 'react-icons/im';
import { Link } from 'react-router-dom';

import './HomeRow.css';

const HomeRow = ({ _id, name, threads, posts, className }) => {
  return (
    <article
      className={
        className ? `home-row-container ${className}` : 'home-row-container'
      }
    >
      <div className='info-container'>
        <ImBubble className='bubble' />
        <div className='title'>
          <Link to={`forum/${name}/${threads}/${_id}/1`}>
            <h4 className='h4-home'>{name}</h4>
          </Link>
          <p className='home-p'>
            {threads === 1 ? `${threads} thread` : `${threads} threads`} -{' '}
            {posts === 1 ? `${posts} post` : `${posts} posts`}
          </p>
        </div>
      </div>
    </article>
  );
};

export default HomeRow;
