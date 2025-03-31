import Job from "../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Errore durante la creazione dell'offerta:", error);
    if (error.name === "ValidationError") {
      for (const field in error.errors) {
        console.error(`- ${field}: ${error.errors[field].message}`);
      }
      return res
        .status(400)
        .json({ message: "Errore di validazione", errors: error.errors });
    }
    res.status(500).json({ message: "Impossibile creare l'offerta di lavoro" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('questions');
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Errore durante il recupero di tutte le offerte di lavoro:', error);
    res.status(500).json({ message: 'Impossibile recuperare le offerte di lavoro' });
  }
};

export const getJob = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id).populate('questions');    
    res.status(200).json(job);
  } catch (error) {
    console.error('Errore durante il recupero dei dettagli dell\'annuncio', error);
    res.status(500).json({ message: 'Impossibile recuperare i dettagli dell\'annuncio' });
  }
};
