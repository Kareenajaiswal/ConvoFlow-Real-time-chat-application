const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const divRouter = require("./routes/division");
const empRouter = require("./routes/employee");
const qrRouter = require("./routes/qr");
const attendanceRouter = require("./routes/attendance");

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