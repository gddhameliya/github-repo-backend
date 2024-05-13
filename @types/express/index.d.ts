/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
    namespace Express {
        interface Request {
            file?: any;
            files?: any;
            query?: string;
            params?: string;
            headers?: string;
            body?: any;
            headers?: any;
            // user: {
            //     id: string;
            //     role: string;
            // }
            user?: any;
        }
        interface Response {
            api: any;
        }
    }
}
