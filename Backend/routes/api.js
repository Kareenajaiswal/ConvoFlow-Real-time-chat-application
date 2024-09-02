const { Router } = require("express");
const router = Router();
const authCheck = require("../middleware/authCheck");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../inc/config");
const { tokenBlacklist } = require("../inc/config");
const { User, Chat, Message } = require("../inc/db");


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
        _id: tokenDecode.id
    })

    res.json({
        Profile: userDetails
    })

})


// CHATS LIST (One to One)

router.get("/chats", authCheck, async (req, res) => {
    const token = req.headers.authorization;
    const tokenDecode = jwt.decode(token);
    const ChatList = await Chat.find({
        participants: { $in: [tokenDecode.id] }  // sender and receiver both will have the same chat list, only if there are common chat room
    })

    res.json({
        ChatList
    })

})

router.post("/chats", authCheck, async (req, res) => {
    const token = req.headers.authorization;
    const tokenDecode = jwt.decode(token);
    const id = tokenDecode.id;

    const receiverid = req.body.receiverid;

    const chatCreate = await Chat.create({
        participants: [id, receiverid]
    })

    res.json({
        msg: "Chat Created !!",
        chatID: chatCreate._id
    })
})

//CHAT ROOM (One to One)

router.get("/chats/messages", authCheck, async (req, res) => { //Inprocess
    const token = req.headers.authorization;
    const tokenDecode = jwt.decode(token);
    const chatId = req.body.chatId; // Which specific chat history you want to see

    //check for the user wether it is a participants is in chat participants array or not,if not then don't proceed

    const chatValidate = await Chat.findOne({
        _id : chatId,
        participants: { $in: [tokenDecode.id] }
    })

    if(chatValidate){
        const chatRoom = await Message.find({
            chatId
        })
    
        res.json({
            chatRoom
        })
    }else{
        res.json({
            msg : null
        })
    }

    

})

router.post("/chats/messages", authCheck, async (req, res) => { //Working
    const token = req.headers.authorization;
    const tokenDecode = jwt.decode(token);
    const id = tokenDecode.id;
    const chatId = req.body.chatId; //where do you want to send your message
    const content = req.body.content; //what is the content of your message

    const message = await Message.create({
        chatId,
        sender: id,
        content
    })

    const chatUpdate = await Chat.updateOne({
        _id: chatId
    }, {
        lastMessage: content,
        lastMessageTime: message.timestamp,
    })

    res.json({
        chat_details: chatUpdate,
        msg: "Message sent successfully !!"
    })




})


module.exports = router, tokenBlacklist;