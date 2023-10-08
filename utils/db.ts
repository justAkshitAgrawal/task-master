import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;
