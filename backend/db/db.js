const mongoose = require('mongoose')
const mongoURL = "mongodb://127.0.0.1:27017/test"

const connectToMongo =async ()=>{
    mongoose.set('strictQuery', true);
    try{
        await mongoose.connect(mongoURL,()=>{
            console.log("connected to mongoDB");
        })
    }
    catch{

    }
}

module.exports =connectToMongo;