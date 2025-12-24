import express from "express"
import dotenv from "./config/dotenv.js"
import cookieParser from "cookie-parser"
import db from "./config/db.js"
import router from "./router/index.js";

const app = express()


app.use(express.urlencoded({extended : true}));
app.use(cookieParser())
app.use('/api',router)
const port = dotenv.PORT || 3000

app.listen(port , (err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log(`Server Started on http://localhost:${port}`);
    }
});
