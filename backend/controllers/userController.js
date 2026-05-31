const User=require("../models/User");
const bcrypt=require("bcryptjs");

const registerUser=async (req,res)=>{

    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const  hashedPassword=await bcrypt.hash(password,10);

        const newUser =new User({
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

const loginUser=async (req,res)=>{
    try{
        const {email, password}=req.body;

        const user=await user.findOne({email});
        if(!user){
            return res.status(400).json({message:"User NotFound"});
        }

        const isMatch=await bcrypt.compare(password,userPassword);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }


         res.json({message:"login successful "});

    }

    catch(error){
         res.status(500).json({error:error.message});

    }
};

const getUsers= async (req,res)=>{
    try{
        const users=await User.find().select("-password");
        res.json(users);

    }
    catch(error){
        res.status(500).json({error:error.message});

    }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};