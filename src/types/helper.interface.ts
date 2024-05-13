import { ObjectId } from 'mongodb';

export interface JwtToken {
    _id: ObjectId;
    email?: string;
    isActive?: boolean;
}
export interface AuthOptions {
    isTokenRequired?: boolean;
    usersAllowed?: string[];
}
export interface decoded {
    user: {
        _id: string;
    };
}
