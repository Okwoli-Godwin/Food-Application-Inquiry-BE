"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviromentvariables_1 = require("./enviromentvariables/enviromentvariables");
const app_1 = require("./app");
const Database_1 = require("./config/Database");
const app = (0, express_1.default)();
(0, app_1.ApplicationConfig)(app);
(0, Database_1.DBConnection)();
process.on("uncaughtException", (error) => {
    console.log("stop here: uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("stop here: unhandledRejection");
    console.log(reason);
    process.exit(1);
});
app.listen(enviromentvariables_1.environmentVariables.PORT, () => {
    console.log("Server is up and running", enviromentvariables_1.environmentVariables.PORT);
});
