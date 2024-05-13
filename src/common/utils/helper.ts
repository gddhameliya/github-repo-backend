/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { JwtToken } from '../../types/helper.interface';
import config from '../../config/env.config';
import axios from 'axios';


//* Create a helper function with different services
const helper = {
    //? Create hash password function
    hashPassword: async ({ password }: { password: string }) => {
        //* Make hash password function
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    },

    //? Make generate JWT token function
    generateToken: async ({ data }: { data: JwtToken }) => {
        //* Make generate token function
        const token = await JWT.sign(data, config.jwt.secret /* { expiresIn: 360000 } */);
        return token;
    },

    //? Make decode JWT token function
    decodeToken: async ({ token }: { token: string }) => {
        //* Make decode token function
        const decoded = await JWT.verify(token, config.jwt.secret);
        return decoded;
    },

    //? Compare hash password function
    comparePassword: async ({ password, hashedPassword }: { password: string; hashedPassword: string }) => {
        //* Make compare password function
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    },

    //? Make the axios request function
    axiosRequest: async ({ url }: { url: string }) => {
        //* Make axios request function
        const response = await axios.get(url);
        return response?.data;
    },
};

export default helper;
