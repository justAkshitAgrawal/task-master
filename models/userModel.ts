import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Email address already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
