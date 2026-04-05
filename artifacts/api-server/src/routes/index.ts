import { Router, type IRouter } from "express";
import healthRouter from "./health";
import jobsRouter from "./jobs";
import verifyRouter from "./verify";

const router: IRouter = Router();

router.use(healthRouter);
router.use(jobsRouter);
router.use(verifyRouter);

export default router;
