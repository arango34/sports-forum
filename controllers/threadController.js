import Thread from '../models/Thread.js';
import moment from 'moment';

const updateThread = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Thread.findByIdAndUpdate(id, { $inc: { posts: 1 } }, { new: true });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getThreads = async (req, res, next) => {
  try {
    let threads = req.threads;
    const btns = req.btns;

    threads = threads.map((item) => {
      let date = moment(item.createdAt);
      date = date.format('MMM Do, YYYY');
      return { ...item, createdAt: date };
    });

    return res.status(200).json({ threads, btns });
  } catch (error) {
    next(error);
  }
};

const postThread = async (req, res, next) => {
  try {
    const thread = await Thread.create(req.body);

    return res.status(201).json({ id: thread._id });
  } catch (error) {
    next(error);
  }
};

const getThreadTitle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findById(id);

    const title = thread.title;

    return res.status(200).json({ title });
  } catch (error) {
    const err = new Error('No Title Found');
    err.code = 400;
    next(err);
  }
};

export { getThreads, postThread, updateThread, getThreadTitle };
