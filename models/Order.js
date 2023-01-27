import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    order: {
      type: Array(Object),
      required: true,
    },
  },

  {
    timestamps: true,
  },
);
export default mongoose.model('Order', OrderSchema);
