import Koa from "koa";
import Cleaner from "../helpers/Cleaner";
import {Quizz, QuizzModel} from "../models/Quizz";
import Response from "../helpers/Response";
import QuestionController from "./QuestionController";
import { QuestionModel } from "../models/Question";
const { MongoClient, ObjectId } = require("MongoDB");


export default {
    create: async (context: Koa.Context) => {
        const body = context.request.body;
        const title = Cleaner.nonEmptyString(body.title);
        // const questions = Cleaner.mongoObjectId(body.questions);
        const questions = body.questions;

        console.log("création d'un quizz")

        console.log(title)
        console.log()

        if (!title || !Array.isArray(questions) || questions.length === 0) {
            return Response.badRequest(context);
        }
        console.log("apres la verification")
        console.log(await QuizzModel.find({}))
        const isExisting = await QuizzModel.isExisting(title)

        if (isExisting) {
            return Response.conflict(context);
        }

        console.log("la creation s'est bien passee")

        const newQuizz = await QuizzModel.create({title, questions});
        return Response.success(context, newQuizz.formatted());
    },
    delete: async (context: Koa.Context) => {
        console.log("coucou depuis le delete")
        const quizzById = await QuizzModel.findById(context.params.id);
        console.log(quizzById)

        if (quizzById === null) {
            return Response.resourceNotFound(context);
        }

        quizzById.deleteQuizz();
        return Response.success(context, quizzById.formatted())
    },
    startquizz: async (context: Koa.Context) => {
        console.log("Quizz cree")

        const quizzAll: Quizz[] = await QuizzModel.all();

        if (quizzAll.length === 0) {
            return Response.resourceNotFound(context);
        }

        const quizzList: Quizz[] = [];
        for (const quizz of quizzAll) {
            quizzList.push(quizz)
        }

        const randomIndex: number = Math.floor(Math.random() * quizzList.length);
        const randomQuizz: Quizz = quizzList[randomIndex];

        console.log("quizz random recupere :", randomQuizz);

        const randomQuestion = QuestionModel.getrandomquestion()

        if (!randomQuestion) {
            return Response.resourceNotFound(context, "cette question n'est pas dans le quizz actuel");
        }

        console.log("ma question aleatoire :", randomQuestion);

        return Response.success(context, {
            quizz: randomQuizz.formatted(),
            randomQuestion,
        });

    }

}



