import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Aryanask16:askjeet123@cluster0.rmlrw.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}