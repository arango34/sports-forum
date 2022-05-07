import './ReplyForm.css';

const ReplyForm = ({
  handleSubmit,
  clearText,
  textArea,
  btn,
  isEditing,
  red,
  setRed,
}) => {
  return (
    <form className='reply-form' onSubmit={handleSubmit}>
      <div className='reply-form-container'>
        <h2 className='reply-form-h2'>REPLY</h2>
        <div className='underline reply-underline'></div>
        <div className='reply-text-container'>
          <textarea
            name='reply'
            className={!red ? 'reply-text' : 'reply-text danger'}
            ref={textArea}
            onClick={() => setRed(false)}
          ></textarea>
        </div>
        <div className='post-thread-btn-container'>
          <button
            type='button'
            className='btn post-thread-btn btn-clear'
            onClick={clearText}
          >
            Clear
          </button>
          <button type='submit' className='btn post-thread-btn' ref={btn}>
            {isEditing ? 'Edit Post' : 'Post Reply'}
          </button>
        </div>
      </div>
      <div className='height'></div>
    </form>
  );
};

export default ReplyForm;
