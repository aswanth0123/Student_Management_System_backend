import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_URI = `mongodb+srv://wazeefa1:wazeefa1@cluster0.3zb1p9n.mongodb.net/sms`;

  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);

    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

