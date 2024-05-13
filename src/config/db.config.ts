import { connect } from "mongoose";
import { logger } from "../common/utils";
import env from "./env.config";

//* connect to the database
export const connectDB = async () => {
    try {
        await connect(env.mongo_uri)
        logger.verbose("Database connected successfully");
    } catch (error) {
        logger.error("Database connection failed");
        process.exit(1);
    }
};

