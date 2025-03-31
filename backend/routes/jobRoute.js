import express from 'express';
import { createJob, getAllJobs, getJob } from '../controllers/jobController.js';

const jobRouter = express.Router();

jobRouter.post('/job', createJob);
jobRouter.get('/jobs', getAllJobs);
jobRouter.get('/job/:id', getJob);

export default jobRouter; 

