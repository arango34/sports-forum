import mongoose from 'mongoose';

const ForumsSchema = new mongoose.Schema({
  name: String,
  threads: Number,
  posts: Number,
  lastThread: String,
});

export default mongoose.model('Forums', ForumsSchema);
