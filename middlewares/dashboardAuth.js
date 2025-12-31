import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
const dashboardAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.redirect('/login');
        }
        let decode = jwt.verify(token , 'myTokenKey');
        let userData = await User.findOne({_id : decode.userId});
        res.locals.user = userData;
        return next();
    } catch (error) {
        console.log(error.message);
        return res.json({ message: "Access Denied ! Login First" })
    }
}

export default dashboardAuth;