import express from 'express';
import { publicRouter } from '../routes/publicApi.js';
import { CustRouter } from '../routes/custApi.js';
import { AdminRouter } from '../routes/adminApi.js';
import cors from 'cors';
import bodyParser from 'body-parser';

export const web = express();
web.use(cors());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({extended: true}))

web.use(publicRouter);
web.use(CustRouter);
web.use(AdminRouter);
