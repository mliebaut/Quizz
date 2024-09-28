import Koa from "koa";
import Cleaner from "../helpers/Cleaner";
import {Quizz, QuizzModel} from "../models/Quizz";
import Response from "../helpers/Response";
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
    }

}



