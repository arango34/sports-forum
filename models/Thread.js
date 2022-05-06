import mongoose from 'mongoose';

const ThreadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide all values'],
    },
    createdBy: {
      type: String,
      required: true,
    },
    forum: {
      type: mongoose.Types.ObjectId,
      ref: 'Forum',
    },
    posts: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Thread', ThreadSchema);
