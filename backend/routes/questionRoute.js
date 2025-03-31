import express from 'express';
import { createQuestion } from '../controllers/questionController.js';

const questionRouter = express.Router();

questionRouter.post('/job/:jobId/question', createQuestion);

export default questionRouter;