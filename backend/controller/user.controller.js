import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {
        const { username, email, password, name, position, responsibility, department, email_2 } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ error: "User already exists with this email" });
        }
        
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        // Create new user with all required fields
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
            position,
            responsibility,
            department,
            email_2
        });
        
        // Save user to database
        await newUser.save();
        
        // Generate token and set cookie
        generateTokenAndSetCookie(newUser._id, res);
        
        // Send response
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            name: newUser.name,
            position: newUser.position,
            department: newUser.department
        });
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect=await bcryptjs.compare(password,user?.password || ""); // if user doesn't exist then use empty string to compare 
        console.log(email,password);

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            email:user.email,
            password:user.password,
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0}); // cleared the cookie
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}




