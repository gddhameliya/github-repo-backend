export interface JwtToken {
    id: string;
    role: string;
    is_verified?: boolean;
}

export interface AuthOptions {
    isTokenRequired?: boolean;
    usersAllowed?: string[];
}

export interface decoded {
    user: {
        id: string;
        role: string;
    };
}

export interface sendEmailOptions {
    to: string;
    name: string;
}
