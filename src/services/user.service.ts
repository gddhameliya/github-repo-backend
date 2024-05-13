/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from '../common/constants';
import { userRepository } from '../repositories/user.repository';
import { helper } from '../common/utils/index';
import { Request } from 'express';
import { ObjectId } from 'mongodb';

interface UserData {
    email: string;
    password?: string;
    isActive: boolean;
    _id: ObjectId;
    token?: string;
    [key: string]: any;
}

//* Function based user service modules
export const userService = {
    //* Register User Service Function
    registerUser: async (req: Request) => {
        try {
            //* Check if the user already exists
            const user = await userRepository.getUser(req)
            if (user) return message.ALREADY_EXIST;

            //* Register user repository function 
            const userData: UserData = (await userRepository.registerUser(req)).toJSON();
            if (!userData) return message.FAILED;

            //* Generate token
            const token: string = await helper.generateToken({ data: { _id: userData._id, email: userData._doc.email } });
            userData._doc.token = token;
            delete userData?._doc?.password;
            delete userData?._doc?.__v;

            return userData._doc;

        } catch (error) {
            console.log(error);
            return message.FAILED;
        }
    },

    //* Login User Service Function
    loginUser: async (req: Request) => {
        try {
            //* Check if the user already exists
            const userData = await userRepository.getUser(req)
            if (!userData) return message.NOT_FOUND;

            //* Check if the password is correct
            const isPasswordValid = await helper.comparePassword({ password: req.body.password, hashedPassword: userData.password });
            if (!isPasswordValid) return message.FAILED;

            //* Generate token
            const token: string = await helper.generateToken({ data: { _id: userData._id, email: userData.email } });
            (userData as any).token = token;
            delete (userData as any).password;

            return userData;

        } catch (error) {
            console.log(error);
            return message.FAILED;
        }
    }
};
