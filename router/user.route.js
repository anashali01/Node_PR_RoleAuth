import {Router} from "express"
import userCtl from "../controllers/userCtrl.js";

const userRouter = Router()

userRouter.post('/',userCtl.addUser)
userRouter.post('/login',userCtl.login)
userRouter.get('/logout',userCtl.logout)

userRouter.get('/',userCtl.getAllUsers)
userRouter.get('/:id',userCtl.getUser);
userRouter.delete('/:id',userCtl.deleteUser)
userRouter.patch('/:id',userCtl.editUser)

export default userRouter;