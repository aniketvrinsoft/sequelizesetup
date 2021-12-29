import express from 'express';
import api from './api.js';
import web from './web.js';

const route=express.Router()

route.use('/',web);
route.use('/api',api);
export default route;