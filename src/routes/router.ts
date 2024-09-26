import Router from 'koa-router';
import StatusController from '../controllers/StatusController';
import UserController from "../controllers/QuestionController";

const router: Router = new Router();
router.get('/status', StatusController.status);

const quizzRouter: Router = new Router({prefix: '/question'});
quizzRouter.post('/create', UserController.create);
quizzRouter.post('/get', UserController.create);
quizzRouter.post('/answerAndGet', UserController.create);
quizzRouter.post('/createOrUpdate', UserController.create);
quizzRouter.post('/:id/update', UserController.update);
quizzRouter.post('/:id/delete', UserController.delete);

router.use(quizzRouter.routes(), quizzRouter.allowedMethods());

export default router;
