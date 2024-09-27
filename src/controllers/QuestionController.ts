import Koa from "koa";
import Cleaner from "../helpers/Cleaner";
import {QuestionModel} from "../models/Question";
import Response from "../helpers/Response";


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

        if (!question|| !answer) {
            return Response.badRequest(context);
        }

        const questionById = await QuestionModel.findById(context.params.id);

        if(questionById === null) {
            return Response.resourceNotFound(context);
        }
        //
        // questionById.updateQuestion({question: "Quel est le bleu ?", answer: "Bleu"})

        console.log("je suis dans l'édition")
        questionById.updateQuestion({question: "Quel est le bleu ?", answer: "Bleu"})

        return Response.success(context, questionById.formatted())
    }
}
    //
    // delete: async (context: Koa.Context) => {
    //     const body = context.request.body;
    //     const firstName = Cleaner.nonEmptyString(body.firstName);
    //     const name = Cleaner.nonEmptyString(body.name);
    //     const genre = Cleaner.isInEnum(body.genre, GenreEnum);
    //     const email = Cleaner.email(body.email);
    //     const password = Cleaner.nonEmptyString(body.password);
    //
    //     if (!firstName || !name || !genre || !email || !password) {
    //         return Response.badRequest(context);
    //     }
    //
    //     const user = await UserModel.findById(context.params.id);
    //
    //     if(user === null) {
    //         return Response.resourceNotFound(context);
    //     }
    //
    //
    //     return Response.success(context, user.formatted())
    // }


