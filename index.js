import express from "express"
import dotenv from "./config/dotenv.js"
import cookieParser from "cookie-parser"
import db from "./config/db.js"
import router from "./router/index.js";
import bodyParser from "body-parser";

const app = express()


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.set("view engine" , "ejs");
app.use(express.static("public"))
app.use('/',router)
const port = dotenv.PORT || 3000

app.listen(port , (err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log(`Server Started on http://localhost:${port}`);
    }
});
