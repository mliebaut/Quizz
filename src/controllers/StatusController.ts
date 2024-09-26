import Koa from 'koa'
import Response from '../helpers/Response';

export default {
    status: async (context: Koa.Context) => {
        return Response.success(context, 'Working.');
    }
}
