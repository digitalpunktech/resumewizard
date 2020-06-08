import mongoose from 'mongoose';

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema(
  {
    email: requiredString,
    password: requiredString,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
