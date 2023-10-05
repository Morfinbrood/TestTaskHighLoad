import express from "express";
import RecordRoutes from "./routes/routes.js";
import expressConfig from "../src/config/express.config.js";

try {
    const app = express();
    const addAllrecordRoutes = new RecordRoutes();
    app.use(addAllrecordRoutes);

    app.listen(expressConfig.PORT, expressConfig.HOST, () => {
        console.log(`Server listens http://${expressConfig.HOST}:${expressConfig.PORT}`);
    });

} catch (error) {
    console.error(`Something went wrong with server  error:${error}`);
}
