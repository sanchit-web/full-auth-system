const User=require("../models/user");
const bcrypt=require("bcryptjs");

const registerUser=async (req,res)=>{

    try{
        const {name,email,passowrd}=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const  hashedPassword=await bcrypt.hash(passowrd,10);

        const newUser =new user({
            name,
            email,
            passwor:hashedPassword,
                });
        
        await newUser.save();

        res.json({message:"user registered succesfully"});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};