import express from "express";
import cors from "cors";

import apiRouter from "./routers/apiRouter.js";
import authRouter from "./routers/authRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter)
app.use("/", apiRouter)

app.listen(PORT,(error) => {
    if (error) throw error;
    console.log(`Express Server listening on port ${PORT}`)
})