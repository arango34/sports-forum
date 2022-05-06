import { useRef } from 'react';
import { Link } from 'react-router-dom';

import './Post.css';

const Post = ({
  user,
  _doc,
  createdAt,
  time,
  textArea,
  reply,
  setIsEditing,
  setEditId,
}) => {
  const art = useRef();
  const postText = useRef();
  const username = useRef();

  const handleQuoteClick = () => {
    if (!reply) {
      const text = postText.current.textContent;
      const userName = username.current.textContent;

      const postHtml =
        `<div class="get-inner"><div class="original-post-reply-container"><div class="post-reply-name-cont no-m">Originally posted by <span class="name-post">${userName}</span>:</div><p class="margin-t-small">${text}</p></div></div>` +
        '\r\n' +
        '\r\n';

      textArea.current.value = textArea.current.value + postHtml;

      textArea.current.scrollIntoView({
        behavior: 'smooth',
      });

      setTimeout(() => {
        const end = textArea.current.value.length;
        textArea.current.setSelectionRange(end, end);
        textArea.current.focus();
      }, 500);
    } else {
      const textToQuote =
        art.current.querySelector('.text-to-quote').textContent;

      const userName = username.current.textContent;

      const postHtml =
        `<div class="get-inner"><div class="original-post-reply-container"><div class="post-reply-name-cont m">Originally posted by <span class="name-post">${userName}</span>:</div><p class="margin-t">${textToQuote}</p></div></div>` +
        '\r\n' +
        '\r\n';

      textArea.current.value = textArea.current.value + postHtml;

      textArea.current.scrollIntoView({
        behavior: 'smooth',
      });

      setTimeout(() => {
        const end = textArea.current.value.length;
        textArea.current.setSelectionRange(end, end);
        textArea.current.focus();
      }, 500);
    }
  };

  const handleQuotePlusClick = () => {
    const getInner = art.current.querySelector('.get-inner');

    let originalPostText = getInner.querySelector(
      '.original-post-reply-container'
    ).innerHTML;

    originalPostText = `<div class="original-post-reply-container">${originalPostText}</div>`;

    const textToQuote = art.current.querySelector('.text-to-quote').textContent;

    const userName = username.current.textContent;

    const postHtml =
      `<div class="get-inner"><div class="original-post-reply-container"><div class="post-reply-name-cont">Originally posted by <span class="name-post">${userName}</span>:</div>${originalPostText}<p class="margin-t">${textToQuote}</p></div></div>` +
      '\r\n' +
      '\r\n';

    textArea.current.value = textArea.current.value + postHtml;

    textArea.current.scrollIntoView({
      behavior: 'smooth',
    });

    setTimeout(() => {
      const end = textArea.current.value.length;
      textArea.current.setSelectionRange(end, end);
      textArea.current.focus();
    }, 500);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditId(art.current.dataset.id);

    if (!reply) {
      const textToEdit = postText.current.textContent;

      textArea.current.value = textToEdit;

      textArea.current.scrollIntoView({
        behavior: 'smooth',
      });

      setTimeout(() => {
        const end = textArea.current.value.length;
        textArea.current.setSelectionRange(end, end);
        textArea.current.focus();
      }, 500);
    } else {
      const getInner = art.current.querySelector('.get-inner');

      let originalPostText = getInner.querySelector(
        '.original-post-reply-container'
      ).innerHTML;

      originalPostText = `<div class="get-inner"><div class="original-post-reply-container">${originalPostText}</div></div>`;

      const textToEdit =
        art.current.querySelector('.text-to-quote').textContent;

      textArea.current.value = originalPostText + textToEdit;

      textArea.current.scrollIntoView({
        behavior: 'smooth',
      });

      setTimeout(() => {
        const end = textArea.current.value.length;
        textArea.current.setSelectionRange(end, end);
        textArea.current.focus();
      }, 500);
    }
  };

  return (
    <article className='post' ref={art} data-id={_doc._id}>
      <div className='post-container'>
        <div className='post-date-container'>
          <p className='post-date'>
            {createdAt} at {time}
          </p>
          <p className='post-num'>#{_doc.postNum}</p>
        </div>
        <div className='post-username-container' ref={username}>
          <Link to={`/profile/${_doc.createdBy}`} className='post-username'>
            {_doc.createdBy}
          </Link>
        </div>
        <div className='post-text-container'>
          <p
            className='post-text'
            dangerouslySetInnerHTML={{ __html: _doc.text }}
            ref={postText}
          ></p>
        </div>
        <div className='quote-container'>
          {user ? (
            <div className='quote-btns-container'>
              {user.userName === _doc.createdBy && (
                <button
                  className='btn btn-quote margin-r'
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
              <button
                className={reply ? 'btn btn-quote' : 'btn btn-quote margin-r'}
                onClick={handleQuoteClick}
              >
                Quote
              </button>
              {reply && (
                <button
                  className='btn btn-quote-plus'
                  onClick={handleQuotePlusClick}
                >
                  Quote+
                </button>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
