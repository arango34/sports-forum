import Post from '../models/Post.js';
import Thread from '../models/Thread.js';

const getBtns = (total, type, page) => {
  page = Number(page);
  total = Number(total);

  if (type === 'post') {
    const lastPage = Math.ceil(total / 10);
    const pagesLeft = Math.ceil(total / 10) - page;
    const difference = lastPage - page;
    if (total <= 10) return [];
    if (total <= 20) return { btns: [1, 2], lastPage };
    if (total <= 30) return { btns: [1, 2, 3], lastPage };
    if (total <= 40) return { btns: [1, 2, 3, 4], lastPage };
    if (total > 40 && page < 3) return { btns: [1, 2, 3, 4], lastPage };
    if (total > 40 && lastPage === page)
      return { btns: [page - 3, page - 2, page - 1, page], lastPage };
    if (total > 40 && difference <= 2)
      return {
        btns: [lastPage - 3, lastPage - 2, lastPage - 1, lastPage],
        lastPage,
      };
    if (total > 40)
      return { btns: [page - 1, page, page + 1, page + 2], lastPage };
    if (pagesLeft < 5)
      return {
        btns: [lastPage - 3, lastPage - 2, lastPage - 1, lastPage],
        lastPage,
      };

    return { btns: [page - 1, page, page + 1, page + 2], lastPage };
  }

  if (type === 'thread') {
    const lastPage = Math.ceil(total / 15);
    const pagesLeft = Math.ceil(total / 15) - page;
    const difference = lastPage - page;
    if (total <= 15) return [];
    if (total <= 30) return { btns: [1, 2], lastPage };
    if (total <= 45) return { btns: [1, 2, 3], lastPage };
    if (total <= 60) return { btns: [1, 2, 3, 4], lastPage };
    if (total > 75 && page < 3) return { btns: [1, 2, 3, 4], lastPage };
    if (total > 75 && lastPage === page)
      return { btns: [page - 3, page - 2, page - 1, page], lastPage };
    if (total > 75 && difference <= 2)
      return {
        btns: [lastPage - 3, lastPage - 2, lastPage - 1, lastPage],
        lastPage,
      };
    if (total > 75)
      return { btns: [page - 1, page, page + 1, page + 2], lastPage };
    if (pagesLeft < 5)
      return {
        btns: [lastPage - 3, lastPage - 2, lastPage - 1, lastPage],
        lastPage,
      };

    return { btns: [page - 1, page, page + 1, page + 2], lastPage };
  }
};

const paginationMiddleware = async (req, res, next) => {
  try {
    const type = req.query.type;
    const postss = req.query.posts;
    const _page = req.query.page;
    const threadss = req.query.count;

    if (type === 'post') {
      const { id } = req.params;
      const btns = getBtns(postss, type, _page);

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let result = Post.find({ threadId: id });

      result = result.skip(skip).limit(limit);

      const posts = await result;
      req.posts = posts;
      req.btns = btns;
      next();
    }

    if (type === 'thread') {
      const { id } = req.params;
      const btns = getBtns(threadss, type, _page);
      const page = Number(_page) || 1;
      const limit = 15;
      const skip = (page - 1) * limit;

      let result = Thread.find({ forum: id }).sort({ updatedAt: -1 });

      result = result.skip(skip).limit(limit);

      let threads = await result;
      req.threads = threads;
      req.btns = btns;
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default paginationMiddleware;
