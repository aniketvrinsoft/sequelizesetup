const NormalAuth = (req, res, next) => {
    console.log("normal auth called")
    if (req.session.loggedin === true) {
        if (req.url === '/login' || req.url === "/register" || req.url === "/") {
            return res.redirect("/home")
        }
        return next();
    } else {
        if (req.url === "/login" || req.url === "/register" || req.url === "/") {

            return next()
        } else {
            return res.redirect("/login")

        }
    }

}

export default NormalAuth;
