"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller/controller");
const UserRoute = (0, express_1.Router)();
UserRoute.route("/createuser").post(controller_1.createUser);
exports.default = UserRoute;
