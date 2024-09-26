import Koa from "koa";
import Response from "../helpers/Response";
import Cleaner from "../helpers/Cleaner";
import {GenreEnum, User, UserModel, UserUpdateData} from "../models/User";

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

        if (await UserModel.isExisting(email)) {
            return Response.badRequest(context);
        }

        const user = await UserModel.create({
            firstName, name, genre, email, password
        });

        return Response.success(context, user.formatted())
    },
    update: async (context: Koa.Context) => {
        const id = Cleaner.mongoObjectId(context.params.id);
        if (id === undefined) {
            return Response.badRequest(context, 'id is not valid');
        }
        const userToUpdate: User | null = await UserModel.findById(id);

        if (userToUpdate === null) {
            return Response.resourceNotFound(context);
        }

        const body = context.request.body;
        const firstName = Cleaner.nonEmptyString(body.firstName);
        const name = Cleaner.nonEmptyString(body.name);
        const genre = Cleaner.isInEnum(body.genre, GenreEnum) !== undefined ? body.genre as GenreEnum : undefined
        const email = Cleaner.email(body.email);
        const password = Cleaner.nonEmptyString(body.password);

        const dataToUpdate: UserUpdateData = {firstName, name, genre, email, password};
        const updatedUser = await userToUpdate.updateUser(dataToUpdate);
        return Response.success(context, updatedUser.formatted());
    },
    delete: async (context: Koa.Context) => {
        const id = Cleaner.mongoObjectId(context.params.id);
        if (id === undefined) {
            return Response.badRequest(context, 'id is not valid');
        }
        await UserModel.findByIdAndDelete(id);

        return Response.success(context);
    }
}

