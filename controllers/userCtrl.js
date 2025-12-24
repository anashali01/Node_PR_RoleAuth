import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userCtl = {
    async addUser(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const user = await User.create(req.body);
            console.log('User Created');
            return res.json({ message: "Created!", data: user })
        } catch (error) {
            console.log(error.message);
            return res.json({ message: "Error!", error: error.message })
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await User.find({})
            return res.json({ data: users })
        } catch (error) {
            console.log(error.message);
        }
    },
    async getUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            return res.json({ message: "User Find", data: user })
        } catch (error) {
            console.log(error.message);
            return res.json({ message: "error", error: error.message })
        }
    },
    async deleteUser(req, res) {
        try {
            const { id } = req.params
            await User.findByIdAndDelete(id)
            return res.json({ message: "User Deleted!" })
        } catch (error) {
            return res.json({ message: "Error!", error: error.message })
        }
    },
    async editUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndUpdate(id, req.body)
            return res.json({ message: "User Updated!", data: user })
        } catch (error) {
            console.log(error.message);
            return res.json({ message: "Error!", error: error.message })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.json({ message: "User not found !" });
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.json({ message: "Invalid Credentials !" });
            }
            let payload = {
                userId: user._id,
                Role: user.role
            };
            const token = jwt.sign(payload, "myTokenKey");
            console.log(token);
            res.cookie('token',token);
            return res.json({ message: "Login Successful !" });
        } catch (error) {
            return res.json(error);
        }
    },
    logout(req,res){
        return res.clearCookie('token').json({message:"Logged Out!"})
    }
}

export default userCtl