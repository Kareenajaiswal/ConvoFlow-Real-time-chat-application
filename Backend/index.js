const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");


const apiRouter = require("./routes/api");


app.use(bodyParser.json());


app.use("/api",apiRouter);

app.get("/",function(req,res){
    res.json({
        msg : "Work In Progress!!"
    })
})

app.listen(port,(req,res)=>{
    console.log("Server is running on http://localhost:"+port);
})