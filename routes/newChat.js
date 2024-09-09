const express = require('express');
const isAuthenticated = require('../middlewares/authCheck');
const newChat = express.Router();


newChat.post('/create',isAuthenticated,(req,res)=>{

    try{

        // console.log("user",req.user);

        

        const {user2} = req.body;
        console.log(user2)
        return res.json({
            user:"hello"
        });
    }

    catch(error){
        return res.json({
            "error":error
        })
    }

})


module.exports = newChat

