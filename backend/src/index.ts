import express, { Request, Router } from "express";
import cors from "cors";
import { rootRouter } from "./routes";
const app = express();
const PORT = 3000;
app.use(cors<Request>())
app.use(express.json())

app.use("/api/v1/", rootRouter);

app.listen(PORT, ()=>{
    console.log(`Express is connected, check http://localhost:${PORT}`)
})