import { validationResult } from "express-validator";
import User from "../../models/User.model.js"
import { Response } from "../../utils/constants.js";
import { jsonGenerate, printData } from "../../utils/helper.js";
export const DeleteUser = async (req, res) => {
    const prevUrl = req.query.prevUrl === undefined ? "/admin/dashboard" : "/admin" + req.query.prevUrl;
    await User.destroy({
        where: { id: req.params.id }
    })

    res.redirect(prevUrl)
}

export const EditUser = async (req, res) => {
    const prevUrl = req.query.prevUrl === undefined ? "/admin/dashboard" : "/admin" + req.query.prevUrl;

    const userInfo = await User.findOne({
        where: { id: req.params.id }
    });
    if (userInfo) {
        return res.render('edituser', { title: "Edit User", req: req, user: req.session.user, userInfo: userInfo })
    }
    return res.status(404).send("Not Found")


}

export const ViewUser = async (req, res) => {
    const prevUrl = req.query.prevUrl === undefined ? "/admin/dashboard" : "/admin" + req.query.prevUrl;
    const userInfo = await User.findOne({
        where: { id: req.params.id }
    });
    if (userInfo) {
        return res.render('viewuser', { title: "View User", req: req, user: req.session.user, userInfo: userInfo })
    }

    res.status(404).send("Not Found")
}


export const EditUserPOST = async (req, res) => {

    const error = validationResult(req);

    console.log(req.body)
    console.log("VALIDATION_ERROR", error)

    const prevUrl = req.query.prevUrl === undefined ? "/admin/dashboard" : "/admin" + req.query.prevUrl;

    let userInfo = await User.findOne({
        where: { id: req.params.id }
    });

    if (!userInfo) {
        return res.status(404).send("Not Found")
    }
    if (error.isEmpty()) {

        const storeObj = { ...req.body };
        try {
            const result = await User.update(
                storeObj,
                { where: { id: req.params.id } }
            )
            console.log("err", "runned")
            return res.redirect(prevUrl)
        } catch (err) {
            console.log(err)
        }
    }


    userInfo = { id: userInfo.id, name: userInfo.name, address: userInfo.address, ...req.body }

    return res.render('edituser', {
        title: "Edit User",
        user: req.session.user,
        req: req,
        userInfo: userInfo, printData: printData,
        error: error.mapped()
    })
}



export const GetUserByToken = async (req, res) => {
    console.log(req.userId)
    const userInfo = await User.findOne({
        where: { id: req.userId }
    });
    if (userInfo) {
        return res.json(jsonGenerate(Response.SUCCESS, "success", userInfo))
    }

    res.status(404).send("Not Found")

}
