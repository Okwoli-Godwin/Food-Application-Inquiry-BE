import dotenv from "dotenv";

dotenv.config();

export const environmentVariables = {
    PORT: process.env.PORT as string,
    MONGODBCONNECT: process.env.MONGODBCONNECT as string,
};