import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
const dashboardAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            console.log('No token found in cookies');
            return res.redirect('/login');
        }
        
        console.log('Token from cookie:', token.substring(0, 20) + '...');
        let decode = jwt.verify(token, 'myTokenKey');
        let userData = await User.findOne({_id: decode.userId});
        res.locals.user = userData;
        return next();
    } catch (error) {
        console.error('JWT verify error:', error.message);
        return res.redirect('/login');
    }
}

export default dashboardAuth;