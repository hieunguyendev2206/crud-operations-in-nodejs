import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/subjectRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("Kết nối với csdl MongoDB thành công !");

    app.listen(PORT, ()=>{
        console.log(`Server đang lắng nghe tại cổng: ${PORT}`);
    })

}).catch(error => console.log(error));


app.use("/api", route);