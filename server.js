import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import connectDb from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import forumRouter from './routes/forumRoutes.js';
import postRouter from './routes/postRoutes.js';
import threadRouter from './routes/threadRoutes.js';

import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/auth', authRouter);
app.use('/api/forums', forumRouter);
app.use('/api/threads', threadRouter);
app.use('/api/posts', postRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
