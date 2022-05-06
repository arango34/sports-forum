import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    const err = new Error('Authentication Invalid');
    err.code = 401;
    next(err);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    const err = new Error('Authentication Invalid');
    err.code = 401;
    next(err);
  }
};

export default auth;
