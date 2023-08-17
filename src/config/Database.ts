import { environmentVariables } from "../enviromentvariables/enviromentvariables";
import mongoose from "mongoose";

const URL = environmentVariables.MONGODBCONNECT;
console.log(URL)

export const DBConnection = async () => {
    try {
        const conn = await mongoose.connect(URL);
        if (mongoose.connection.host === "0.0.0.0") {
            console.log("Connected to localhost");
        } else {
            console.log("Database is live now");
        }
    } catch (error) {
        console.log("Database connection error: Couldn't connect because", error);
    }
};