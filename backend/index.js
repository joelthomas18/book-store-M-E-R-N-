
import express from "express"
import { PORT,MONGODB_URL } from "./config.js"
import mongoose from "mongoose"
import router from "./routes/booksRoutes.js"
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())
app.use("/books",router)

// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.get("/",(req,res) => {

    res.status(234).send("hello world!")

})


mongoose.connect(MONGODB_URL).then(() => {

console.log("application connected to database")
app.listen(PORT,() => {

    console.log(`App is listening to ${PORT}`)

})

}).catch(errror => console.log(errror))