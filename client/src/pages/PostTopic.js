import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

import Loading from '../components/Loading';
import Spinner from '../components/Spinner';

import './PostTopic.css';

const PostTopic = () => {
  const initialState = {
    title: '',
    post: '',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState(initialState);
  const { user, createThread, showSpin, alert, alertText, threadCounts } =
    useAppContext();
  const { sport, id } = useParams();
  const navigate = useNavigate();

  const btn = useRef();

  const threadCount = threadCounts.filter((item) => item.name === sport);

  const handleSubmit = (e) => {
    e.preventDefault();
    btn.current.disabled = true;
    const { title, post } = values;
    const thread = {
      createdBy: user.userName,
      title,
      forum: id,
      text: post,
    };
    createThread(thread, sport, user._id);
    if (values.title === '' || values.post === '')
      return (btn.current.disabled = false);

    setTimeout(() => {
      navigate(`/forum/${sport}/${threadCount[0].threadCount + 1}/${id}/1`);
    }, 2000);

    setTimeout(() => {
      btn.current.disabled = false;
    }, 3000);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [user, values, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='post-thread-section'>
      <h2 className='post-thread-h2'>
        Create a {sport.charAt(0).toUpperCase() + sport.slice(1)} Thread
      </h2>
      <div className='loading-container'>
        <div className={!showSpin && !alert ? 'spin-hidden' : ''}>
          {showSpin ? <Spinner /> : <div className='red'>{alertText}</div>}
        </div>
        {/* <div className={!showSpin ? 'spin-hidden' : ''}>
          <Spinner />
        </div> */}
      </div>
      <form className='post-thread-container' onSubmit={handleSubmit}>
        <div className='subject-container'>
          <label className='subject-label' htmlFor='subject'>
            Subject:{' '}
          </label>
          <input
            type='text'
            name='title'
            className='subject-input'
            onChange={handleChange}
          />
        </div>
        <textarea
          type='text'
          name='post'
          className='post-thread-input'
          onChange={handleChange}
        />
        <div className='post-thread-btn-container'>
          <button type='submit' className='btn post-thread-btn' ref={btn}>
            Post Thread
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostTopic;
