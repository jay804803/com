import mongoose from "mongoose";

const connectDB = ()=>{
   
    mongoose.connect(process.env.DB).then(()=>{
        console.log("database connected..");  
    }).catch((error)=>{
        console.log(error);
    })

}

export default connectDB;

