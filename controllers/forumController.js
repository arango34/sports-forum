import Forums from '../models/Forums.js';

const getForums = async (req, res) => {
  const forums = await Forums.find({});
  res.status(200).json(forums);
};

const updateForumPosts = async (req, res, next) => {
  try {
    const { sport } = req.params;
    await Forums.findOneAndUpdate(
      { name: sport },
      { $inc: { posts: 1 } },
      { new: true }
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateForumThreads = async (req, res, next) => {
  try {
    const { sport } = req.params;

    await Forums.findOneAndUpdate(
      { name: sport },
      { $inc: { threads: 1 } },
      { new: true }
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getThreadCount = async (req, res, next) => {
  try {
    const forums = await Forums.find({});

    const threadCounts = forums.reduce((total, item) => {
      total = [...total, { name: item.name, threadCount: item.threads }];
      return total;
    }, []);
    res.status(200).json(threadCounts);
  } catch (error) {
    const err = new Error('Bad Request');
    err.code = 400;
    next(err);
  }
};

export { getForums, updateForumPosts, updateForumThreads, getThreadCount };
