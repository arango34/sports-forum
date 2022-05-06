import User from '../models/User.js';

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      const err = new Error('please provide all values');
      err.code = 400;
      next(err);
    }

    const emailAlreadyExists = await User.findOne({ email });
    const userNameAlreadyExists = await User.findOne({ userName });

    if (emailAlreadyExists) {
      const err = new Error('Email already in use');
      err.code = 400;
      next(err);
    }

    if (userNameAlreadyExists) {
      const err = new Error('username already in use');
      err.code = 400;
      next(err);
    }

    const user = await User.create(req.body);
    const token = await user.createJWT();
    res.status(201).json({
      user: {
        _id: user._id,
        userName: user.userName,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    const err = new Error('please provide all values');
    err.code = 400;
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      const err = new Error('please provide all values');
      err.code = 400;
      next(err);
    }

    let user = await User.findOne({ userName }).select('+password');

    if (!user) {
      const err = new Error('Invalid Credentials');
      err.code = 401;
      next(err);
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      const err = new Error('Invalid Credentials');
      err.code = 401;
      next(err);
    }

    const token = user.createJWT();

    user.password = undefined;

    user = {
      _id: user._id,
      userName: user.userName,
    };

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    const err = new Error('please provide all values');
    err.code = 400;
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { values } = req.body;

    if (!values.email || !values.username) {
      const err = new Error('please provide all values');
      err.code = 400;
      next(err);
    }

    let user = await User.findOne({ _id: id });
    user.email = values.email;
    user.userName = values.username;

    await user.save({ runValidators: true });
    const token = user.createJWT();

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    const err = new Error('please provide all values');
    err.code = 400;
    next(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (!user) {
    const err = new Error('No user found');
    err.code = 404;
    next(err);
  }

  await user.remove();

  res.sendStatus(200);
};

export { register, login, updateUser, getUser, deleteUser };
