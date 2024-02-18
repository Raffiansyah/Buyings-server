import express from 'express';
import { publicRouter } from '../routes/publicApi.js';
import { CustRouter } from '../routes/custApi.js';
import { AdminRouter } from '../routes/adminApi.js'

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(CustRouter);
web.use(AdminRouter)
