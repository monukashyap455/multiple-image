const express = require("express");
const app = express()
const dotenv = require("dotenv").config()
const connection = require("./server/mongoDb")
app.use(express.json());

connection()

const imageUpload = require("./routes/imageUpload")

app.use(imageUpload)



const port = process.env.PORT
app.listen(port, () => console.log(`Server Start on port ${port}`));



