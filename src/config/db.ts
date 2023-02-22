// import { ConnectOptions } from "mongodb";
import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://cuong:vomanhcuong0612@manhcuong.xcawxom.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDb Connected");
};
