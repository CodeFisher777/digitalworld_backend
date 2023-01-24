import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: String,

    rating: String,

    imageUrl: String,
    videoUrl: String,
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('Product', ProductSchema);