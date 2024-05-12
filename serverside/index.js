import express, { json } from "express";
import cors from "cors";
import router from "./Routes/route.js";

const app = express();

app.use(json());

app.use(cors());

app.use("/api", router);

app.listen(5000, (req, res) => {
    console.log("server is Running ");
})
