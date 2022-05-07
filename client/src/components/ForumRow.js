import { Link } from 'react-router-dom';
import { BsSquareFill } from 'react-icons/bs';

import './ForumRow.css';

const ForumRow = ({ className, createdAt, sport, _doc }) => {
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
            <h4 className='h4-forum'>
              <Link
                to={`/thread/${sport}/${_doc._id}/${_doc.posts}/1`}
                className='row-link'
              >
                {_doc.title}
              </Link>
              <span className='arrow'>{'>>'}</span>
              <Link to={`/thread/${sport}/${_doc._id}/${_doc.posts}/${pages}`}>
                <span className='page'>page {pages}</span>
              </Link>
            </h4>
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
