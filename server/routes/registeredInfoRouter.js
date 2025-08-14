import express from "express"
import { registeredInfoController } from "../controllers/registeredinfo.controller.js"


export const registeredInfoRouter = express.Router()

registeredInfoRouter.post("", registeredInfoController )