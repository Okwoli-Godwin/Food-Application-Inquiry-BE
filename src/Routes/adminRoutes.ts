import { Router } from "express";
import {
  AdminLogin,
  createAdmin,
  deleteAdmin,
  viewAllRegisteredUsers,
} from "../controller/adminController";
const AdminRoute = Router();

AdminRoute.route("/createadmin").post(createAdmin);
AdminRoute.route("/adminlogin").post(AdminLogin);
AdminRoute.route("/viewallusers").get(viewAllRegisteredUsers);
AdminRoute.route("/deleteadmin/:adminID").delete(deleteAdmin);

export default AdminRoute;