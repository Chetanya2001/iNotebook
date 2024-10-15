import mongoose from "mongoose";

const mongoURI = "mongodb://chetanya:mathur%402001@127.0.0.1:27017/";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI); // No need for deprecated options
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongo;
