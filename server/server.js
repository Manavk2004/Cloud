import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { registeredInfoRouter } from "./routes/registeredInfoRouter.js"

const PORT = 3001

const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}))

app.use(express.json())


app.use('/registeredinfo', registeredInfoRouter)

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})