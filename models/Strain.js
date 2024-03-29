// models/ProductItem.js
import mongoose from 'mongoose';

const StrainItemSchema = new mongoose.Schema({
  strain: {
    type: String,
    required: [true, 'Please provide a strain name'],
  },
  harvestDate: {
    type: String,
    required: [true, 'Please provide a strain name'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This references the 'User' model
    required: true,
  },
  quantityLBS: {
    type: Number,
    required: [true, 'Please Provide quantity '],
  },
  askingPrice: {
    type: Number,
    required: [true, 'Please provide asking price'],
  },
  pictures: {
    type: Array,
    default: [],
  }, // Array of picture URLs
  video: {
    type: String,
    default: '',
  }, // Single video URL
  // onOff: Boolean,
});

const Strain =
  mongoose.models.strain || mongoose.model('strain', StrainItemSchema);

export default Strain;
