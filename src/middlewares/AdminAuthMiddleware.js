const AdminAuth = (req, res, next) => {
    console.log(req.url)
    if (req.session.loggedin === true && req.session.user.userRole === 'admin') {
        if (req.url === "/") {
            return res.redirect("/admin/dashboard")
        }
        return next();
    } else {
        if (req.url === "/") {
            return next()
        } else {
            return res.redirect("/admin/")

        }
    }
    next();
}

export default AdminAuth;
