import { Request } from 'express';
import db from '../model/index'

//? /* Function based user repo */
export const userRepository = {
    //* Register user repository function
    registerUser: async (req: Request) => {
        return await db.USER.create(req.body)
    },

    //* Get the user that name or phone number already exists
    getUser: async (req: Request) => {
        return await db.USER.findOne({ email: req.body.email }).lean();
    },
};
