import {Router} from "express"
import userCtl from "../controllers/userCtrl.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = Router()

userRouter.post('/',userCtl.addUser)
userRouter.post('/login',userCtl.login)
userRouter.get('/logout',userCtl.logout)

// userRouter.use(userAuth);
userRouter.get('/',userAuth,userCtl.getAllUsers)
userRouter.get('/:id',userAuth,userCtl.getUser);
userRouter.delete('/:id',userAuth,userCtl.deleteUser)
userRouter.patch('/:id',userAuth,userCtl.editUser)

export default userRouter;