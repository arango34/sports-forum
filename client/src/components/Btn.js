import { useParams, Link } from 'react-router-dom';

import './ThreadButtons.css';

const Btn = ({ item }) => {
  const { page, postss, sport, id, threadss } = useParams();

  return (
    <div>
      {parseInt(page) === parseInt(item) ? (
        <button type='button' className='btn-container disabled margin-right'>
          {item}
        </button>
      ) : (
        <Link
          to={
            postss
              ? `/thread/${sport}/${id}/${postss}/${item}`
              : `/forum/${sport}/${threadss}/${id}/${item}`
          }
        >
          <button className='btn-container margin-right color'>{item}</button>
        </Link>
      )}
    </div>
  );
};

export default Btn;
