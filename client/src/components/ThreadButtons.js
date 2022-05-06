import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

import './ThreadButtons.css';
import Btn from './Btn';

const ThreadButtons = () => {
  const { btns } = useAppContext();

  const { lastPage } = btns;
  const { page, id, sport, postss, threadss } = useParams();
  return (
    <div>
      {!btns || btns.length === 0 ? (
        ''
      ) : (
        <div className='thread-btns-container'>
          <div className='btn-container-left'>
            {page === '1' ? (
              <>
                <div className='btn-container disabled'>
                  <FaAngleDoubleLeft />
                </div>
                <div className='btn-container disabled'>
                  <FaAngleLeft />
                </div>
              </>
            ) : (
              <>
                <Link
                  to={
                    postss
                      ? `/thread/${sport}/${id}/${postss}/1`
                      : `/forum/${sport}/${threadss}/${id}/1`
                  }
                  className='color'
                >
                  <div className='btn-container'>
                    <FaAngleDoubleLeft />
                  </div>
                </Link>
                <Link
                  to={
                    postss
                      ? `/thread/${sport}/${id}/${postss}/${parseInt(page) - 1}`
                      : `/forum/${sport}/${threadss}/${id}/${
                          parseInt(page) - 1
                        }`
                  }
                  className='color'
                >
                  <div className='btn-container'>
                    <FaAngleLeft />
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className='btn-container-nums'>
            {btns.btns.map((item, i) => {
              return <Btn key={i} item={item} />;
            })}
          </div>
          <div className='btn-container-right'>
            {parseInt(page) === lastPage ? (
              <>
                <div className='btn-container disabled'>
                  <FaAngleRight />
                </div>
                <div className='btn-container disabled'>
                  <FaAngleDoubleRight />
                </div>
              </>
            ) : (
              <>
                <Link
                  to={
                    postss
                      ? `/thread/${sport}/${id}/${postss}/${parseInt(page) + 1}`
                      : `/forum/${sport}/${threadss}/${id}/${
                          parseInt(page) + 1
                        }`
                  }
                  className='color'
                >
                  <div className='btn-container'>
                    <FaAngleRight />
                  </div>
                </Link>
                <Link
                  to={
                    postss
                      ? `/thread/${sport}/${id}/${postss}/${lastPage}`
                      : `/forum/${sport}/${threadss}/${id}/${lastPage}`
                  }
                  className='color'
                >
                  <div className='btn-container'>
                    <FaAngleDoubleRight />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadButtons;