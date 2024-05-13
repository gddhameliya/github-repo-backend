/* eslint-disable @typescript-eslint/no-explicit-any */
import { hash } from "bcryptjs";
import { Schema, model } from "mongoose";

//* User schema 
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});


userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password") || this.isNew)
            if (this.password) this.password = await hash(this.password, 10);

        next();
    } catch (error: any) {
        console.log("🚀 ~ error:", error)
        next(error);
    }
});

userSchema.set("toJSON", {
    transform: function (ret: any,) {
        delete ret["password"];
        return ret;
    },
});

export const userModel = model("User", userSchema);
