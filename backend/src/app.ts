import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
}))

app.get("/", (_req, res) => {
    res.send("Backend");
})


app.listen(PORT,(error) => {
    if (error) throw error;
    console.log(`Express Server listening on port ${PORT}`)
})