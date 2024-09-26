import Koa from "koa";
import Response from "../helpers/Response";
import Cleaner from "../helpers/Cleaner";
import {GenreEnum, UserModel} from "../models/User";
import response from "../helpers/Response";

export default {
    create: async (context: Koa.Context) => {
        const body = context.request.body;
        const firstName = Cleaner.nonEmptyString(body.firstName);
        const name = Cleaner.nonEmptyString(body.name);
        const genre = Cleaner.isInEnum(body.genre, GenreEnum);
        const email = Cleaner.email(body.email);
        const password = Cleaner.nonEmptyString(body.password);

        if (!firstName || !name || !genre || !email || !password) {
            return Response.badRequest(context);
        }

        const isExisting = await UserModel.isExisting(email)

        if(isExisting) {
            return Response.conflict(context)
        }

        const user = await UserModel.create({
            firstName, name, genre, email, password
        });

        return Response.success(context, user.formatted())
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

        user.updateUserInfos({firstname: "Serena", name: "Williamsss"})

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

        user.deleteUser();

        return Response.success(context, user.formatted())
    }
}

