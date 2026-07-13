import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/api", (_req, res) => {
    res.json("This is the api router.")
})

export default apiRouter;