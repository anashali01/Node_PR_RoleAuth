import { Router } from "express";
import dashboardCtl from "../controllers/dashboardCtl.js";
import taskCtl from "../controllers/taskCtl.js";
import dashboardAuth from "../middlewares/dashboardAuth.js";

const dashboardRouter = Router();

dashboardRouter.get('/login' , dashboardCtl.loginPage);
dashboardRouter.post('/login' , dashboardCtl.login);
dashboardRouter.get('/logout',dashboardCtl.logout)
dashboardRouter.use(dashboardAuth);

dashboardRouter.get('/',dashboardCtl.dashboardPage);
dashboardRouter.get('/addData',dashboardCtl.addDataPage);
dashboardRouter.post('/addData',dashboardCtl.addData);
dashboardRouter.get('/viewManager',dashboardCtl.viewManagerPage);
dashboardRouter.get('/viewEmployee',dashboardCtl.viewEmployeePage);
dashboardRouter.get('/changePassword' , dashboardCtl.changePasswordPage);
dashboardRouter.post('/changePassword' , dashboardCtl.changePassword);
dashboardRouter.get('/deleteManager/:id',dashboardCtl.deleteManager);
dashboardRouter.get('/deleteEmployee/:id',dashboardCtl.deleteEmployee);
dashboardRouter.get('/editManager/:id',dashboardCtl.editManagerPage);
dashboardRouter.post('/editManager/:id',dashboardCtl.editManager);
dashboardRouter.get('/deleteEmployee/:id',dashboardCtl.deleteEmployee);
dashboardRouter.get('/editEmployee/:id',dashboardCtl.editEmployeePage);
dashboardRouter.post('/editEmployee/:id',dashboardCtl.editEmployee);
dashboardRouter.get('/makeAdmin/:id',dashboardCtl.makeAdmin);
// Task routes
dashboardRouter.get('/addTask', taskCtl.addTaskPage);
dashboardRouter.post('/addTask', taskCtl.addTask);
dashboardRouter.get('/viewTasks', taskCtl.viewTasksPage);
export default dashboardRouter;
