import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { homeRouter } from "./routes/homeRouter.js"


const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}))

app.use(express.json())


app.use("/home", homeRouter)