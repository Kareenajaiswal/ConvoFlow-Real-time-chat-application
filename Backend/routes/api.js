const { Router } = require("express");
const router = Router();
const authCheck = require("../middleware/authCheck");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../inc/config");
const { tokenBlacklist } = require("../inc/config");
const { User, Chat } = require("../inc/db");


// LOGIN & REGISTRATION

router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;


    const usrCreate = await User.create({
        name,
        email,
        password,
        avatar
    });

    if (usrCreate) {
        res.json({
            msg: "User created !!",
            Details: {
                usrCreate
            }
        })
    } else {
        res.status(404).json({
            msg: "Error"
        })
    }

})



router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const validUser = await User.findOne({
        email,
        password
    })
    const id = validUser._id.toString();
    if (validUser) {
        const token = jwt.sign({ id }, jwtSecret);
        const tokenDecode = jwt.decode(token);

        res.json({
            token
        })
    } else {
        res.status(404).json({
            msg: "Authentication Failed !!"
        })
    }

})

router.post("/logout", authCheck, (req, res) => {
    const token = req.headers.authorization;

    tokenBlacklist.push(token);
    res.json({
        msg: "Logged Out!!"
    })
})


//PROFILE 

router.get("/profile", authCheck, async (req, res) => {
    const token = req.headers.authorization;
    const tokenDecode = jwt.decode(token);
    const userDetails = await User.findOne({
        _id : tokenDecode.id
    })

    res.json({
        Profile: userDetails
    })

})

// CHATS
router.get("/chats", authCheck, async (req, res) => {
    const token = req.headers.authorization;
    const tokenDecode = jwt.decode(token);
    const id = tokenDecode.id;

    const receiverid = req.body.receiver;

    await Chat.create({
        participants : [id,receiverid]
    })

    res.json({
        msg : "Chat Created !!",
        chatID : _id
    })
})

module.exports = router, tokenBlacklist;