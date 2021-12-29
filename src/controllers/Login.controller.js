import { validationResult } from "express-validator"
import User from "../models/User.model.js"
import { printData } from "../utils/helper.js"
import bcrypt from 'bcrypt';
import e from "express";

export const LoginGET = (req, res) => {
    res.render('login', { title: 'login now' })
}

export const LoginPOST = async (req, res) => {
    const error = validationResult(req)
    //console.log(error.mapped()['username'])


    if (!error.isEmpty()) {
        return res.render('login', { title: "login now", error: error.mapped(), printData: printData })
    } else {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username: username },
        });
        if (user) {
            const verified = bcrypt.compareSync(password, user.password);
            if (verified) {
                req.session.loggedin = true;
                req.session.user = user;
                return res.redirect('/home');
            }
        }


    }


    res.render('login', { title: "login now", errorMessage: "Username or password is incorrect", printData: printData, error: [] })

}