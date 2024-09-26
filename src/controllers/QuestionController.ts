import Koa from "koa";
import Response from "../helpers/Response";
import Cleaner from "../helpers/Cleaner";
import {GenreEnum, UserModel} from "../models/User";
import response from "../helpers/Response";

export default {
    create: async (context: Koa.Context) => {
        const body = context.request.body;
        const question = Cleaner.nonEmptyString(body.question);
        const answer = Cleaner.nonEmptyString(body.answer);

        if (!question || !answer) {
            return Response.badRequest(context);
        }

        const isExisting = await UserModel.isExisting(question)

        if(isExisting) {
            return Response.error(context);
        }

        const question = await UserModel.create({
            question, answer
        });

        return Response.success(context, question.formatted())
    },

    update: async (context: Koa.Context) => {

        const body = context.request.body;
        const firstName = Cleaner.nonEmptyString(body.firstName);
        const name = Cleaner.nonEmptyString(body.name);
        const genre = Cleaner.isInEnum(body.genre, GenreEnum);
        const email = Cleaner.email(body.email);
        const password = Cleaner.nonEmptyString(body.password);

        if (!firstName || !name || !genre || !email || !password) {
            return Response.badRequest(context);
        }

        const user = await UserModel.findById(context.params.id);

        if(user === null) {
            return Response.resourceNotFound(context);
        }

        return Response.success(context, user.formatted())
    },

    delete: async (context: Koa.Context) => {
        const body = context.request.body;
        const firstName = Cleaner.nonEmptyString(body.firstName);
        const name = Cleaner.nonEmptyString(body.name);
        const genre = Cleaner.isInEnum(body.genre, GenreEnum);
        const email = Cleaner.email(body.email);
        const password = Cleaner.nonEmptyString(body.password);

        if (!firstName || !name || !genre || !email || !password) {
            return Response.badRequest(context);
        }

        const user = await UserModel.findById(context.params.id);

        if(user === null) {
            return Response.resourceNotFound(context);
        }


        return Response.success(context, user.formatted())
    }
}

