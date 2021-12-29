import express from 'express';
import { AdminDashboard } from '../controllers/admin/Dashboard.admin.controller.js';
import AdminLogin, { AdminLoginPost } from '../controllers/admin/Login.admin.controller.js';
import { DeleteUser, EditUser, ViewUser, EditUserPOST } from '../controllers/admin/UserActions.admin.controller.js';
import Home from '../controllers/Home.controller.js';
import Homepage from '../controllers/Homepage.controller.js';
import { LoginGET, LoginPOST } from '../controllers/Login.controller.js';
import { RegisterGET, RegisterPOST } from '../controllers/Register.controller.js';
import AdminAuth from '../middlewares/AdminAuthMiddleware.js';
import NormalAuth from '../middlewares/NormalAuthMiddleware.js';
import LoginSchema from '../validationSchema/LoginSchema.js';
import UpdateUserSchema from '../validationSchema/UpdateUserSchema.js';
const web = express.Router();

web.get('/', NormalAuth, Homepage);

web.get('/login', NormalAuth, LoginGET);
web.post('/login', NormalAuth, LoginSchema, LoginPOST);

web.get('/register', NormalAuth, RegisterGET);
web.post('/register', NormalAuth, LoginSchema, RegisterPOST);


// protected routes
web.get('/home', NormalAuth, Home);
web.get('/logout', NormalAuth, (req, res) => { req.session = null; res.redirect("/login") });



// admin routes
const adminRoute = express.Router();

adminRoute.get("/", AdminLogin)
adminRoute.post("/", LoginSchema, AdminLoginPost)

adminRoute.get("/dashboard", AdminDashboard)

adminRoute.get("/user/edit/:id", EditUser)
adminRoute.post("/user/edit/:id", UpdateUserSchema, EditUserPOST)


adminRoute.get("/user/delete/:id", DeleteUser)
adminRoute.get("/user/view/:id", ViewUser)




web.use("/admin", AdminAuth, adminRoute);


export default web;



