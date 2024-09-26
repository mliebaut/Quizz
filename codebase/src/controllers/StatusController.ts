import Koa from 'koa'
import Response from '../helpers/Response';
import {UserModel} from "../models/User";

export default {
    status: async (context: Koa.Context) => {

        console.log(await UserModel.isExisting("jason.deruazearflo@gmail.fr"));

        return Response.success(context, 'Working.');
    }
}
