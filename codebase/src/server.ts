import './boot/config';
import app from "./app";
import db from "./boot/database";
import Echo from "./helpers/Echo";

async function main() {
    try {
        // DATABASE ----------------------------------
        await db.connect();

        // APPLICATIONS ----------------------------------
        console.log("Starting app..");

        const appHostname: string = process.env.APP_HOSTNAME || "127.0.0.1";
        const appPort: number = Number(process.env.APP_API_PORT) || 3000;

        const server = app.listen(appPort, appHostname);
        Echo.green(`Listening to http://${appHostname}:${appPort}`);
        return server;
    } catch (exception) {
        console.log("Stopping.");
        console.error(exception);
    }
}

main();
