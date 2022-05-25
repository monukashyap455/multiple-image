const mongoose = require("mongoose");


module.exports = async (req,res) => {
 try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
 } catch (error) {
    console.log("Database error");
 }
}
       


