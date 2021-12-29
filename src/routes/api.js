import express from 'express';

const api = express.Router();
// with prefix /api/

api.get('/', (req, res) => res.send("ok api"));



export default api;