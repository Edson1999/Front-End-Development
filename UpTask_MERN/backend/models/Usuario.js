import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define schema (database structure)
/* The code is defining a Mongoose schema for a user document in a MongoDB database. The schema
specifies the structure and properties of the user document. */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* The `userSchema.pre('save', async function (next) { ... })` is a pre-save middleware function in
Mongoose. It is executed before saving a user document to the database. */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* The `userSchema.methods.checkPassword` function is a custom method added to the userSchema. It is
used to compare a given password with the hashed password stored in the user document. */
userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
