import jwt from "jsonwebtoken"
const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const decoded = jwt.verify(token, "myTokenKey");

        if (!token) {
            return res.json({ message: "Access Denied ! Login First" })
        }

        if (decoded.Role !== "Admin") {
            if (req.params.id) {
                if (decoded.userId !== req.params.id) {
                    return res.json({ message: "Access Denied ! You can access only your data" })
                }else{
                    return next();
                }
            }
            return res.json({ message: "Access Denied ! Admins Only" })
        }
        return next();
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "Access Denied ! Login First" })
    }
}

export default userAuth;