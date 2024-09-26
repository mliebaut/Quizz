import Koa from "koa";
import Response from "../helpers/Response";

export default async (context: Koa.Context, next: Koa.Next) => {
    try {
        await next();
    } catch (exception) {
        console.error(exception);
        // A cet en endroit on ajoute l'erreur dans sentry
        return Response.error(context);
    }

    if (context.status === 404 && context.body === undefined) {
        return Response.resourceNotFound(context);
    }
};