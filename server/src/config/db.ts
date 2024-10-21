import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const DB =
      "mongodb+srv://zoto:mongoDB@cluster0.tsume.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // const conn = await mongoose.connect(process.env.MONGO_URI as string);
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unexpected error: ", error);
    }
    process.exit(1);
  }
};
