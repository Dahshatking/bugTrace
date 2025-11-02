import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
}
export default connectDB;