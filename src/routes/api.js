import express from 'express';
import Login from '../api/v1/Login.api.js';
import { DeleteUser, GetUser, GetUsers } from '../api/v1/Users.api.js';
import ApiAuthMiddleware from '../middlewares/ApiAuthMiddleware.js';
import LoginSchema from '../validationSchema/LoginSchema.js';

const api = express.Router();
// with prefix /api/

api.get('/login', LoginSchema, Login);

// Authenticated routes
const authenticatedRoute = express.Router();

authenticatedRoute.get('/getUsers', GetUsers);
authenticatedRoute.get('/getUser/:id', GetUser);
authenticatedRoute.get('/delete/:id', DeleteUser);

api.use(ApiAuthMiddleware, authenticatedRoute);

export default api;