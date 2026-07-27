import bcrypt from "bcrypt"; 
import dotenv from "dotenv"; 
import User from "../models/model.user.js"; 
import GmcError from "../utils/GmcError.js"; 

dotenv.config(); 

const regnewUserService = async (userData) => {

  const userExists = await User.findOne({ username: userData.username }); 
  if (userExists) { 
    throw new GmcError( 
      409, 
      "A User with the username/email already exists." 
    );
  }

  const saltRounds = Number(process.env.saltRounds) || 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const savedUser = await User.create({
    username: userData.userName,
    fullName: userData.fullName,
    whatsappNumber: userData.whatsappNumber,
    email: userData.email,
    password: hashedPassword,
    walletBalance: userData.walletBalance || 0,
    userStatus: userData.userStatus || "ACTIVE"
  });

  return { 
    newUser: { 
      id: savedUser._id, 
      username: savedUser.username, 
      walletBalance: savedUser.walletBalance, 
      userStatus: savedUser.userStatus 
    } 
  }; 
}; 

export default regnewUserService;
