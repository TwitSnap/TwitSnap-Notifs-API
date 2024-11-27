import "reflect-metadata";
import express from "express";
import {errorMiddleware} from "./api/errors/handling/ErrorHandler";
import {PORT} from "./utils/config";
import {logger} from "./utils/container";
import cors from 'cors';
import router from "./api/routes/routes";
import {Helpers} from "./utils/helpers";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);
Helpers.initializeFirebaseAdmin();

app.listen(PORT, () => {
    logger.logInfo(`Server is running on port ${PORT}`);
});

//TODO
//1. Documentar
//2. Agregar tests