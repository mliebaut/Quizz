import Response from "../helpers/Response";
import Koa from "koa";

export default async (context: Koa.Context, next: Koa.Next) => {
    if (process.env.APP_API_KEY === undefined || context.request.headers['api-key'] === process.env.APP_API_KEY) {
        await next();
    } else {
        return Response.forbidden(context);

    }
}