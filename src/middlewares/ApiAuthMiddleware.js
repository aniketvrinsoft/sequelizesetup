import { JWT_TOKEN, Response } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import jwt from 'jsonwebtoken';
const ApiAuthMiddleware = (req, res, next) => {


    if (req.headers['auth-token'] === undefined) {
        return res.json(jsonGenerate(Response.AUTH_ERROR, "Access Denied", { error: "auth header is required" }))
    }

    const token = req.headers['auth-token'];
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);

        req.userId = decoded.userId;
        return next();

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }



}

export default ApiAuthMiddleware;
