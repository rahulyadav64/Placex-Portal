import { Router, type IRouter } from "express";
import healthRouter from "./health";
import jobsRouter from "./jobs";
import verifyRouter from "./verify";
import portalJobsRouter from "./portal-jobs";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(jobsRouter);
router.use(verifyRouter);
router.use(portalJobsRouter);
router.use(adminRouter);

export default router;
