import { jsonGenerate } from "../../utils/helper.js";
import { JWT_TOKEN, Response } from "../../utils/constants.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import User from '../../models/User.model.js';
//
const Login = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.json(jsonGenerate(Response.VALIDATION_ERROR, "Validation Error", error.mapped()))
    }
    // if validation pass.. check from database


    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username: username },
    });
    if (user) {
        const verified = bcrypt.compareSync(password, user.password);

        const token = Jwt.sign({ userId: user.id, }, JWT_TOKEN);

        const data = { userId: user.id, loginToken: token }

        if (verified) {
            return res.json(jsonGenerate(Response.SUCCESS, "SUCCESS", data))
        }
    }



    res.json(jsonGenerate(Response.AUTH_ERROR, "Username or Password is incorrect"))
}
export default Login;