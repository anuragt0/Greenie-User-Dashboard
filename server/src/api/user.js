const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../database/models/User");


router.get("/all", async (req,res)=>{
    try {
        const allUsers = await User.find();
        res.status(200).json({success: true, message: "Users fetched successfully", allUsers});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
})

router.post("/create", async (req, res)=>{
    // client will give all the required fields inside of body (req.body)
    try {

        const registerForm = req.body;
        // Add current time of user creation in registration form
        registerForm.creationDate = Date.now();

        // hash password and update form
        registerForm.password = await bcrypt.hash(registerForm.password, 2);

        // Create the user in database
        await User.create(registerForm);

        res.status(200).json({success: true, message: "Account created successfully"});
        
    } catch (error) {
        res.status(501).json({success: false, message: "Username already exists"});
    }
})









module.exports = router;
