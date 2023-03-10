import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    order: {
      type: String,
      required: true,
    },
    numberOrder: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);
export default mongoose.model('Order', OrderSchema);
