import Post from '../models/Post.js';
import User from '../models/User.js';
import moment from 'moment';

const getPosts = async (req, res) => {
  let posts = req.posts;
  const btns = req.btns;

  posts = posts.map((item) => {
    let date = moment(item.createdAt);
    date = date.format('MMM Do, YYYY');
    let time = moment(item.createdAt).format('hh:mm A');
    time.startsWith('0') ? (time = time.slice(1)) : (time = time);
    return { ...item, createdAt: date, time };
  });

  return res.status(200).json({ posts, btns });
};

const postReply = async (req, res, next) => {
  try {
    await Post.create(req.body);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
  const { text } = req.body;
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    await Post.findByIdAndUpdate(id, { text }, { new: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(err);
  }
};

const updateUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, { $inc: { posts: 1 } }, { new: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getPosts, postReply, updatePost, updateUserPosts };
