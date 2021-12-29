import { validationResult } from "express-validator";
import User from "../../models/User.model.js";
import { printData } from "../../utils/helper.js";
import bcrypt from 'bcrypt';
const AdminLogin = (req, res) => {
    res.render("admin_login", { title: "Admin login" });
}

export const AdminLoginPost = async (req, res) => {
    const error = validationResult(req);
    console.log(error)
    if (!error.isEmpty()) {
        return res.render("admin_login", { title: "Admin login", error: error.mapped(), printData: printData });
    }

    // on validation success

    const { username, password } = req.body;
    const user = await User.findOne({
        where: { username: username },

    });

    if (user) {
        console.log("usertest", user.username)
        const verified = bcrypt.compareSync(password, user.password);
        if (verified && user.userRole === "admin") {
            req.session.loggedin = true;
            req.session.user = user;
            return res.redirect('/admin/dashboard');
        }
    }

    return res.render("admin_login", { title: "Admin login", errorMessage: "Username or password is incorrect" });
}

export default AdminLogin;
