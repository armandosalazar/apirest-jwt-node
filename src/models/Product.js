import mongoose, { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => mongoose.Types.ObjectId().toString(),
    },
    name: String,
    category: String,
    price: Number,
    imgURL: String,
  },
  { timestamps: true, versionKey: false }
);

export default model('Product', productSchema);
