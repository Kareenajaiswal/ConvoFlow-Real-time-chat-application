const express = require("express");
const port = 8000;
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());

//for socket (testing in process)
const http = require('http');
const server = http.createServer(app);
const initializeSocket = require('./socket');
initializeSocket(server);


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