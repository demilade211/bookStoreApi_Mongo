import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let options = { 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'bookCollection' 
}
try {
    await mongoose.connect(process.env.db,options,()=>{
        console.log("connected to db");
    });
    
  } catch (error) {
    handleError(error);
  }

export default mongoose;
