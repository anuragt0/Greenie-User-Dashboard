const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../../databases/mongodb/models/User");



router.get("/hello", (req,res)=>{
    res.send("Hello");
})








module.exports = router;
