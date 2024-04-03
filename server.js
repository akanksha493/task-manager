const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const tasksRouter = require("./routes/tasks");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static("./public"))

//router
app.use("/api/v1/tasks", tasksRouter);


connectDB();
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    }catch(err){
        console.log(err);
    }
}
app.listen(process.env.PORT || 3000, function(error){
    if(error) console.log(error)
    else console.log("server is running");
})