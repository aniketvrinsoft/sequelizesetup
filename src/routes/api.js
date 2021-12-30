import express from 'express';
import Login from '../api/v1/Login.api.js';
import RegisterUser from '../api/v1/Register.api.js';
import { DeleteUser, GetUser, GetUsers } from '../api/v1/Users.api.js';
import { GetUserByToken } from '../controllers/admin/UserActions.admin.controller.js';
import ApiAuthMiddleware from '../middlewares/ApiAuthMiddleware.js';
import LoginSchema from '../validationSchema/LoginSchema.js';

const api = express.Router();
// with prefix /api/

api.post('/login', LoginSchema, Login);
api.post('/register', LoginSchema, RegisterUser);


// Authenticated routes
const authenticatedRoute = express.Router();

authenticatedRoute.get('/getUsers', GetUsers);
authenticatedRoute.get('/getUser/:id', GetUser);
authenticatedRoute.get('/delete/:id', DeleteUser);
authenticatedRoute.post('/tokenUser', GetUserByToken);
api.use(ApiAuthMiddleware, authenticatedRoute);

export default api;