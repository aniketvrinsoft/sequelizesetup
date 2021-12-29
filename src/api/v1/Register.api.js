import { validationResult } from "express-validator";
import User from "../../models/User.model.js";
import { JWT_TOKEN, Response } from "../../utils/constants.js";
import { jsonGenerate } from "../../utils/helper.js";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const RegisterUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(jsonGenerate(Response.VALIDATION_ERROR, "Validation Error", error.mapped()))
    }
    const { username, password } = req.body;
    const oldUser = await User.findOne({
        where: { username: username }
    })

    if (oldUser) {
        return res.json(jsonGenerate(Response.UNPROCESSABLE_DATA, "Username already exist"))
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username: username, password: hashedPassword })

    const token = Jwt.sign({ userId: newUser.id, }, JWT_TOKEN);

    const data = { userId: newUser.id, loginToken: token }

    return res.json(jsonGenerate(Response.SUCCESS, "Account successfully registered", data))
}
export default RegisterUser;