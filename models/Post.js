import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    createdBy: String,
    text: {
      type: String,
      required: [true, 'Please provide all values'],
    },
    threadId: {
      type: mongoose.Types.ObjectId,
      ref: 'Thread',
    },
    postNum: Number,
    repliedTo: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
