const { connStr } = require("./config");
const mongoose = require("mongoose");
mongoose.connect(connStr);


const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const User = mongoose.model("User",UserSchema);

module.exports = {
    User
};