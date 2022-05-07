import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import ForumRow from '../components/ForumRow';
import Loading from '../components/Loading';
import ThreadButtons from '../components/ThreadButtons';

import './Forum.css';

const Forum = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { sport, id, page, threadss } = useParams();
  const { user, getThreads, threads, logoutUser, setShowLinksFalse } =
    useAppContext();

  useEffect(() => {
    setIsLoading(true);
    if (!user) {
      logoutUser();
    }

    getThreads(id, threadss, page);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [id, sport, user, threadss, page]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section onClick={setShowLinksFalse}>
      <h2 className='forum-h2'>
        {sport.charAt(0).toUpperCase() + sport.slice(1)} Forum
      </h2>
      <div className='underline'></div>
      <ThreadButtons />
      <div className='forum-btn-container'>
        {user ? (
          <Link
            to={`/forum/post-topic/${sport}/${id}`}
            className='btn btn-topic'
          >
            Post a Topic
          </Link>
        ) : (
          <Link className='btn btn-topic' to='/login'>
            Post a Topic
          </Link>
        )}
      </div>
      {!threads.threads || threads.threads.length === 0 ? (
        <div>no threads to display</div>
      ) : (
        <div
          className={
            threadss < 16
              ? 'forum-row-container marginB'
              : 'forum-row-container'
          }
        >
          {threads.threads.length > 0 &&
            threads.threads.map((item, i) => {
              return (
                <ForumRow
                  key={i}
                  className={i % 2 === 0 ? 'grey' : null}
                  {...item}
                  sport={sport}
                />
              );
            })}
        </div>
      )}
      <ThreadButtons />
      <div className='padding' onClick={setShowLinksFalse}></div>
    </section>
  );
};

export default Forum;
