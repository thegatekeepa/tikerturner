import mongoose from "mongoose";
import { UserStatus } from "../utils/constants.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema (
    {
        userName: {
            type: String,
            required: true, 
            trim: true, 
            unique: true, 
            sparse: true
        },

        fullName: {
            type: String, 
            required: true, 
            trim: true
        },

        whatsappNumber: {
            type: String, 
            required: true, 
            validate: {
                validator: function (value) {
                    return /^\d{11}$/.test(value);
                }, message: "Please enter 11 digits number to continue."
            }
        },

        email: {
            type: String,
            required: true,
            unique: true, 
            trim: true, 
            lowercase: true
        },
        
        password: { 
            type: String, 
            required: true, 
            validate: {
                validator: function (value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(value);
                }, 
                message: 
                "Password must be at least 8 characters long & include uppercase, lowercase, and a special character."
            }, 
            select: false
         },

         refferalCode: {
            type: String, 
            trim: true
         },

         refferedBy: {
            type: mongoose.Schema.Types.ObjectId, 
            //ref: Refferer
         }, 

         refferalCount: {
            type: Number, 
         }, 

         walletId: {
            type: mongoose.Schema.Types.ObjectId, 
            //ref: Wallet
         },

         walletBalance: {
            type: Number, 
            default: 0
         },

        userStatus: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.active
        },
}, 
{
    timestamps: true
}
);

//compare entered password with stored hash (in service)
userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;