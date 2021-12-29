import { check } from "express-validator";
export default [
    check('username', 'username is required')
        .exists()
        .trim()
        .isLength({ min: 3, max: 12 })
        .withMessage("username should be 3 to 12 chars").isAlphanumeric(),
    check('password', 'password is required').exists().trim().isLength({ min: 3, max: 12 }).withMessage("username should be 3 to 12 chars"),
]