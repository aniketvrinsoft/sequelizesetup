import { jsonGenerate, parseNumber } from "../../utils/helper.js";
import User from "../../models/User.model.js";
import { Response } from "../../utils/constants.js";
export const GetUsers = async (req, res) => {
    const userId = req.userId;

    const limit = 10;
    const page = parseNumber(req.query.page);
    let offset = 0 + (page - 1) * limit
    const result = await User.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: { exclude: ['password'] }
    });
    const hasMore = (limit * page) < result.count ? true : false;
    if (result.rows.length > 0) {
        return res.json(jsonGenerate(Response.SUCCESS, "success", { hasMore: hasMore, users: result.rows }))
    }

    return res.json(jsonGenerate(Response.NOT_FOUND, "No Users", { hasMore: hasMore, users: [] }))

}

export const GetUser = async (req, res) => {
    //const userId = req.userId;

    const userInfo = await User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] }
    });

    if (userInfo) {

        return res.json(jsonGenerate(Response.SUCCESS, "success", userInfo))
    }

    return res.json(jsonGenerate(Response.NOT_FOUND, "No User found"))

}

export const DeleteUser = async (req, res) => {
    const userId = req.userId;
    if (userId == req.params.id) {
        return res.json(jsonGenerate(Response.VALIDATION_ERROR, "You cannot delete yourself"))
    }
    const isAdminUser = await User.findOne({
        where: { id: userId }
    })

    if (isAdminUser.userRole === "admin") {
        const c = await User.destroy({
            where: { id: req.params.id }
        })

        if (c) {
            return res.json(jsonGenerate(Response.SUCCESS, "User deleted Successfully"))
        } else {
            return res.json(jsonGenerate(Response.NOT_FOUND, "User Not Found"))
        }
    }
    return res.json(jsonGenerate(Response.VALIDATION_ERROR, "Only Admin can delete"))

}
