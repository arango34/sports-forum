import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThreadButtons from '../components/ThreadButtons';
import Loading from '../components/Loading';
import Post from '../components/Post';
import ReplyForm from '../components/ReplyForm';
import { useAppContext } from '../context/appContext';

import './Thread.css';

const Thread = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [red, setRed] = useState(false);
  const { user, posts, getPosts, postReply, title, logoutUser } =
    useAppContext();
  let { id, page, sport, postss } = useParams();
  const navigate = useNavigate();
  const postsContainer = useRef();
  const textArea = useRef();
  const btn = useRef();

  const clearText = () => {
    setIsEditing(false);
    textArea.current.value = '';
  };

  const handleClick = () => {
    textArea.current.scrollIntoView({
      behavior: 'smooth',
    });

    setTimeout(() => {
      textArea.current.focus();
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (textArea.current.value === '') return setRed(true);

    try {
      if (!isEditing) {
        btn.current.disabled = true;

        if (textArea.current.value === '') return;

        postReply({
          post: {
            createdBy: user.userName,
            text: textArea.current.value,
            threadId: id,
            postNum: parseInt(postss) + 1,
          },
          id: id,
          sport,
          userId: user._id,
        });

        clearText();

        if (posts.length === 10) {
          navigate(
            `/thread/${sport}/${id}/${parseInt(postss) + 1}/${Math.ceil(
              (parseInt(postss) + 1) / 10
            )}`
          );
          return;
        }

        navigate(`/thread/${sport}/${id}/${parseInt(postss) + 1}/${page}`);
      } else {
        axios.patch(`/api/posts/${editId}`, {
          text: textArea.current.value,
        });
        setIsEditing(false);
        setIsEdited(!isEdited);
      }
    } catch (error) {
      console.log(error.response.msg);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (!user) {
      logoutUser();
    }

    try {
      getPosts(id, page, postss);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [getPosts, id, page, postss, isEdited, user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='thread-section'>
      <h2 className='thread-h2'>{title}</h2>
      <ThreadButtons />
      <div className='forum-btn-container thread-btn-container'>
        {user ? (
          <button className='btn btn-topic ' onClick={handleClick}>
            Reply To Thread
          </button>
        ) : (
          <Link className='btn btn-topic' to='/login'>
            Reply To Thread
          </Link>
        )}
      </div>
      <div className='posts-container' ref={postsContainer}>
        {!posts || posts.length === 0 ? (
          <div>no posts to display</div>
        ) : (
          posts.map((item, i) => {
            return (
              <Post
                key={i}
                {...item}
                user={user}
                setIsEditing={setIsEditing}
                setEditId={setEditId}
                editId={editId}
                textArea={textArea}
              />
            );
          })
        )}
      </div>
      <ThreadButtons />
      {user ? (
        <ReplyForm
          user={user}
          handleSubmit={handleSubmit}
          clearText={clearText}
          textArea={textArea}
          btn={btn}
          isEditing={isEditing}
          editId={editId}
          setIsEdited={setIsEdited}
          red={red}
          setRed={setRed}
        />
      ) : (
        <div className='forum-btn-container thread-btn-container'>
          <Link to='/login' className='btn btn-topic'>
            Reply To Thread
          </Link>
        </div>
      )}
    </section>
  );
};

export default Thread;
