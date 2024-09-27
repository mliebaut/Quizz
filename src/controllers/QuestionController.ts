import Koa from "koa";
import Cleaner from "../helpers/Cleaner";
import {QuestionModel} from "../models/Question";
import Response from "../helpers/Response";
const { MongoClient, ObjectId } = require("MongoDB");


export default {
    create: async (context: Koa.Context) => {
        const body = context.request.body;
        const question = Cleaner.nonEmptyString(body.question);
        const answer = Cleaner.nonEmptyString(body.answer);

        console.log("Je suis dans la création ")

        if (!question || !answer) {
            return Response.badRequest(context);
        }

        console.log(await QuestionModel.find({}))
        const isExisting = await QuestionModel.isExisting(question)

        if (isExisting) {
            return Response.conflict(context);
        }

        const newQuestion = await QuestionModel.create({question, answer});
        return Response.success(context, newQuestion.formatted());
    },

    update: async (context: Koa.Context) => {
        const body = context.request.body;
        const question = Cleaner.nonEmptyString(body.question);
        const answer = Cleaner.nonEmptyString(body.answer);

        if (!question || !answer) {
            return Response.badRequest(context);
        }

        const questionById = await QuestionModel.findById(context.params.id);

        if (questionById === null) {
            return Response.resourceNotFound(context);
        }

        console.log("je suis dans l'édition")
        questionById.updateQuestion({answer: "Pacequ'ils adorent les extensions hihi"})

        return Response.success(context, questionById.formatted())
    },
    delete: async (context: Koa.Context) => {
        // console.log("premier coucou")
        // const body = context.request.body;
        // const question = Cleaner.nonEmptyString(body.question);
        // const answer = Cleaner.nonEmptyString(body.answer);
        // console.log(question)
        // console.log(answer)
        //
        // if (!question || !answer) {
        //     return Response.badRequest(context);
        // }
        console.log("coucou depuis le delete")
        const questionById = await QuestionModel.findById(context.params.id);
        console.log(questionById)

        if (questionById === null) {
            return Response.resourceNotFound(context);
        }

        questionById.deleteQuestion();
        return Response.success(context, questionById.formatted())
    },
    get: async (context: Koa.Context) => {
        console.log("Je suis le get")

        console.log(await QuestionModel.listIndexes());

        return Response.success(context)
    }

}



