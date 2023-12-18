// models/ProductItem.js
import mongoose from 'mongoose';

const StrainItemSchema = new mongoose.Schema({
  strain: String,
  harvestDate: String,
  quantityLBS: Number,
  askingPrice: Number,
  pictures: [String], // Array of picture URLs
  video: String, // Single video URL
  onOff: Boolean,
});

const Strain = mongoose.model('strain', StrainItemSchema);

export default Strain;
