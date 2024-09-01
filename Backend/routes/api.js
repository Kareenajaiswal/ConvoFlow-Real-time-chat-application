const { Router } = require("express");
const router = Router();
const authCheck = require("../middleware/authCheck");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../inc/config");
const { tokenBlacklist } = require("../inc/config");
const { User } = require("../inc/db");

router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


    const usrCreate = await User.create({
        name,
        email,
        password,
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

    if (validUser) {
        const token = jwt.sign({ email }, jwtSecret);
        console.log("Your token is " + token);
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


router.get("/profile", authCheck, async (req, res) => {
    const id = req.body.id;

    const userDetails = await User.findOne({
        _id : id
    })

    res.json({
        Profile: userDetails
    })

})

module.exports = router, tokenBlacklist;