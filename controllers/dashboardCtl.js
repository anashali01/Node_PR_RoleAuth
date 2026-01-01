import axiosInstance from "../config/axios.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "../config/dotenv.js";
import jwt from "jsonwebtoken"
import Task from "../models/task.model.js";

const dashboardCtl = {
    async dashboardPage(req, res) {
        try {
            let managerCount = await User.countDocuments({role : 'Manager'});
            let employeeCount = await User.countDocuments({role : 'Employee'});
            let taskCount = await Task.countDocuments({});
            return res.render('./index.ejs',{
                managerCount,
                employeeCount,
                taskCount
            })
        } catch (error) {
            return res.render('./index.ejs',{
                managerCount : 0,
                employeeCount : 0
            })
        }
    },
    loginPage(req, res) {
        return res.render('./pages/login.ejs')
    },
    async login(req, res) {
        try {
            let response = await fetch(`${dotenv.API_URL}api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body)
            });
            let data = await response.json();
            console.log('API Response:', data);

            if (!data || !data.token) {
                console.log('ERROR: No token in response', data);
                return res.redirect('/login?error=no-token');
            }

            console.log('Setting cookie with token');
            res.cookie('token', data.token);
            return res.redirect('/');
        } catch (error) {
            console.log(error.message);
            res.redirect(req.get('Referer') || '/')
        }
    },
    logout(req, res) {
        return res.clearCookie('token').redirect('/login');
    },
    changePasswordPage(req, res) {
        return res.render('./pages/changePassword.ejs')
    },
    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword, confirmPassword } = req.body;

            const {token} = req.cookies;
            let decode = jwt.verify(token, 'myTokenKey');
            let user = await User.findOne({ _id: decode.userId });

            let isValid = await bcrypt.compare(currentPassword, user.password);

            if (isValid) {
                if (newPassword == confirmPassword) {
                    user.password = await bcrypt.hash(newPassword, 10);
                    await user.save();
                    return res.redirect('/login');
                } else {
                    req.flash('error', "Password Doesn't Match !");
                    return res.redirect(req.get('Referrer') || '/');
                }
            } else {
                req.flash('error', 'Password Is Invalid');
                return req.redirect(req.get('Referrer') || '/');
            }
        } catch (error) {
            console.log(error);

            console.log(`Error occurred !`);
        }
    },
    addDataPage(req, res) {
        return res.render('./pages/AddData.ejs')
    },
    async addData(req, res) {
        try {
            let Response = await fetch(`${dotenv.API_URL}api/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body)
            });
            console.log('Created!');
            return res.redirect(req.get('Referer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referer') || '/')
        }
    },
    async viewManagerPage(req, res) {
        try {
            let Response = await fetch(`${dotenv.API_URL}api/`, {
                method: "GET"
            });
            let data = await Response.json();
            let manager = data.data.filter((item) => item.role === 'Manager')

            return res.render('./pages/ViewManager.ejs', {
                manager
            })
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/ViewManager.ejs', {
                manager: []
            });
        }
    },
    async viewEmployeePage(req, res) {
        try {
            let Response = await fetch(`${dotenv.API_URL}api/`, {
                method: "GET"
            });
            let data = await Response.json();
            let employee = data.data.filter((item) => item.role === 'Employee')

            return res.render('./pages/ViewEmployee.ejs', {
                employee
            })
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/ViewEmployee.ejs', {
                employee: []
            });
        }
    },
    async deleteManager(req, res) {
        try {
            await axiosInstance.delete(`${dotenv.API_URL}api/${req.params.id}`);
            return res.redirect('/ViewManager');
        } catch (error) {
            console.log(error);
            return res.redirect('/ViewManager');
        }
    },
    async deleteEmployee(req, res) {
        try {
            await axiosInstance.delete(`${dotenv.API_URL}api/${req.params.id}`);
            return res.redirect('/ViewEmployee');
        } catch (error) {
            console.log(error);
            return res.redirect('/ViewEmployee');
        }
    },
    async editManagerPage(req, res) {
        try {
            let data = await axiosInstance.get(`${dotenv.API_URL}api/${req.params.id}`);

            return res.render('./pages/editManager.ejs', {
                manager: data.data
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/viewManager');
        }
    },
    async editEmployeePage(req, res) {
        try {
            let data = await axiosInstance.get(`${dotenv.API_URL}api/${req.params.id}`);

            return res.render('./pages/editEmployee.ejs', {
                employee: data.data
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/viewEmployee');
        }
    },
    async editManager(req, res) {
        try {
            console.log(req.body);

            req.body.password = await bcrypt.hash(req.body.password, 10);
            await axiosInstance.patch(`${dotenv.API_URL}api/${req.params.id}`, req.body);
            return res.redirect('/viewManager');
        } catch (error) {
            console.log(error);
            return res.redirect('/viewManager');
        }
    },
    async editEmployee(req, res) {
        try {
            console.log(req.body);

            req.body.password = await bcrypt.hash(req.body.password, 10);
            await axiosInstance.patch(`${dotenv.API_URL}api/${req.params.id}`, req.body);
            return res.redirect('/viewEmployee');
        } catch (error) {
            console.log(error);
            return res.redirect('/viewEmployee');
        }
    },
    // Makeing A Manager As Admin
    async makeAdmin(req, res) {
        try {
            const { id } = req.params;
            let data = await User.findById(id);
            console.log(data);

            data.role = "Admin";
            await data.save();
            return res.redirect('/viewManager');
        } catch (error) {
            console.log(error);
            return res.redirect('/viewManager');
        }
    },
    logout(req, res) {
        return res.clearCookie('token').redirect('/login');
    }
}

export default dashboardCtl;