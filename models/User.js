import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    farmName: {
      type: String,
      unique: true,
      required: true,
    },
    licenseNo: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.models('User', userSchema);
