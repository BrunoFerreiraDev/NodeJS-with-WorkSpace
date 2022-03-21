import { Router } from "express";
import MovieRouter from "./MovieRouter.js";
import UserRouter from "./UserRouter.js";
import SessionRouter from "./SessionRouter.js";
import TicketRouter from "./TicketRouter.js";

const router = Router();

router.use(MovieRouter);
router.use(UserRouter);
router.use(SessionRouter);
router.use(TicketRouter);

export default router;
