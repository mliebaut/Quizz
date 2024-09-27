import Koa from 'koa'

export default {
    make: function(context: Koa.Context, status: number, data: any = null, message: string|null = null): void {
        const success = (status < 400);
        const response:any = {success: success };
        if (data !== undefined && data !== null) {
            response['data'] = data;
        }
        if (message !== undefined && message !== null) {
            response['message'] = message;
        }
        context.status = status;
        context.body = (response as object);
    },

    success: function(context: Koa.Context, data: any = null, message: string|null = null): void {
        this.make(context, 200, data, message);
    },

    error: function(context: Koa.Context, message: string|null = null): void {
        this.make(context, 500, null, message);
    },

    resourceNotFound: function(context: Koa.Context, message: string|null = null): void {
        this.make(context, 404, null, message);
    },
    conflict: function(context: Koa.Context, message: string|null = null): void {
        this.make(context, 409, null, message);
    },
    unprocessableEntity: function(context: Koa.Context, message: string|null = null): void {
        this.make(context, 422, null, message);
    },

    unauthorized: function(context: Koa.Context, message: string|null = null): void {
        this.make(context, 401, null, message);
    },

    forbidden: function(context: Koa.Context, message: string|null = null): void {
        this.make(context, 403, null, message);
    },

    badRequest: function (context: Koa.Context, message?: string, data: any = null): void {
        this.make(context, 400, data, message);
    },
}
