const mongoose = require('mongoose');
const {DB_NAME} = require('../constants');

const connectDB=async()=>{
    try {
        const ConeectionINstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB connected: ${ConeectionINstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error -> ",error);
        process.exit(1);
        
    }
}
module.exports=connectDB;