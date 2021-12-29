import { check } from "express-validator"
import User from "../models/User.model.js";
import { Op } from "sequelize";
const UpdateUserSchema = [
    check('username', 'username is required')
        .exists()
        .trim()
        .isAlphanumeric()
        .isLength({ min: 3, max: 12 })
        .withMessage("username should be 3 to 12 chars")
        .custom((value, { req, loc, path }) => {
            return User.findOne({
                where: {
                    username: req.body.username,
                    id: { [Op.ne]: req.params.id }
                }
            }).then(user => {
                if (user) {
                    console.log("from validation", user)
                    return Promise.reject('Username already in use');
                }
            })
        })
    ,

    check('name').trim().
        isLength({ max: 32 }).
        withMessage("Name  should be max 32 chars"),

    check('address').trim()
        .isLength({ max: 500 })
        .withMessage("address should be under 500 character"),

    check('userRole', "userRole is required").trim(),
]

export default UpdateUserSchema;