import Router from 'koa-router';
import StatusController from '../controllers/StatusController';
import QuestionController from "../controllers/QuestionController";
import QuizzController from '../controllers/QuizzController';

const router: Router = new Router();
router.get('/status', StatusController.status);

const questionRouter: Router = new Router({prefix: '/question'});
questionRouter.post('/create', QuestionController.create);
questionRouter.post('/:id/update', QuestionController.update);
questionRouter.post('/:id/delete', QuestionController.delete);
questionRouter.get('/getrandomquestion', QuestionController.getrandomquestion);
// questionRouter.post('/answerAndGet', QuestionController.create);
// questionRouter.post('/createOrUpdate', QuestionController.create);

const quizzRouter: Router = new Router({prefix: '/quizz'});
quizzRouter.post('/create', QuizzController.create);
//quizzRouter.post('/:id/delete', QuizzController.delete);


router.use(questionRouter.routes(), questionRouter.allowedMethods(), quizzRouter.routes(), quizzRouter.allowedMethods());

export default router;
