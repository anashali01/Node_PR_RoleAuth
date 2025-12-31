import {Router} from "express"
import userRouter from "./user.route.js";
import dashboardRouter from "./dashboardRouter.js";

const router = Router();

router.use('/api',userRouter)
router.use('/',dashboardRouter)
export default router;