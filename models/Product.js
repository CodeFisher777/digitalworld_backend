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

    category: Number,

    rating: Number,

    imageUrl: String,
    videoUrl: String,
  },
  {
    timestamps: true,
  },
);
ProductSchema.index({ title: 'text' });
export default mongoose.model('Product', ProductSchema);
