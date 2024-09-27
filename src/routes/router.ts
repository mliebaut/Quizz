import Router from 'koa-router';
import StatusController from '../controllers/StatusController';
import QuestionController from "../controllers/QuestionController";

const router: Router = new Router();
router.get('/status', StatusController.status);

const questionRouter: Router = new Router({prefix: '/question'});
questionRouter.post('/create', QuestionController.create);
questionRouter.post('/:id/update', QuestionController.update);
questionRouter.post('/:id/delete', QuestionController.delete);
questionRouter.get('/get', QuestionController.get);
// questionRouter.post('/answerAndGet', QuestionController.create);
// questionRouter.post('/createOrUpdate', QuestionController.create);


router.use(questionRouter.routes(), questionRouter.allowedMethods());

export default router;
