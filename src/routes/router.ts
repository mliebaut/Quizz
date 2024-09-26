import Router from 'koa-router';
import StatusController from '../controllers/StatusController';
import UserController from "../controllers/UserController";

const router: Router = new Router();
router.get('/status', StatusController.status);

const userRouter: Router = new Router({prefix: '/user'});
userRouter.post('/create', UserController.create);
userRouter.post('/:id/update', UserController.update)
userRouter.post('/:id/delete', UserController.delete)

router.use(userRouter.routes(), userRouter.allowedMethods());

export default router;
