import express from "express";
import {errorMiddleware} from "./api/errors/handling/ErrorHandler";
import {PORT} from "./utils/config";
import {logger} from "./utils/container";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

const router = express.Router();
app.use('/v1', router);

app.listen(PORT, () => {
    logger.logInfo(`Server is running on port ${PORT}`);
});


//TODO:
//0. Levantar envVars para envio de mails
//0.1. Mapear errores a statusCodes
//1. Codear POST /v1/eventNotification
//2. Setear rutas
//2. Probar POST /v1/event