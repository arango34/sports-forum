import { Link } from 'react-router-dom';
import { BsSquareFill } from 'react-icons/bs';
import { useAppContext } from '../context/appContext';

import './ForumRow.css';

const ForumRow = ({ className, createdAt, sport, _doc }) => {
  const { setTitle } = useAppContext();
  const pages = Math.ceil(parseInt(_doc.posts) / 10);
  return (
    <article
      className={
        className ? `forum-row-article ${className}` : 'forum-row-article'
      }
    >
      <div className='forum-info-container'>
        <BsSquareFill className='square' />
        <div className='title'>
          <div className='forum-title-container'>
            <Link
              to={`/thread/${sport}/${_doc._id}/${_doc.posts}/1`}
              className=''
              onClick={() => setTitle(_doc.title)}
            >
              <h4 className='h4-forum'>
                {_doc.title}
                <span className='arrow'>{'>>'}</span>
                <Link
                  to={`/thread/${sport}/${_doc._id}/${_doc.posts}/${pages}`}
                  onClick={() => setTitle(_doc.title)}
                >
                  <span className='page'>page {pages}</span>
                </Link>
              </h4>
            </Link>
          </div>
          <p className='forum-p'>
            {createdAt} - {_doc.createdBy}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ForumRow;
