import { Router } from "express";
import { createUser } from "../controller/controller";
const UserRoute = Router();

// UserRoute.route("/createuser").post(createUser);
// UserRoute.route("/userlogin").post(userLogin);
// UserRoute.route("/viewallregisteredusers").get(viewAllRegisteredUsers);
// UserRoute.route("/viewaparticularuser/:userID").get(viewAParticularUser);
// UserRoute.route("/viewallsearchedusers").get(viewAllSearchedUsers);
// UserRoute.route("/deleteuser/:userID").delete(deleteUser);

export default UserRoute;