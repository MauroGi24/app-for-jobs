import Question from '../models/questionModel.js';

export const createQuestion = async (req, res) => {
    try {
      const { jobId } = req.params; 
      const { user, question } = req.body; 
  
      const newQuestion = new Question({
        user: user,
        question: question,
        job: jobId, 
      });
  
      const savedQuestion = await newQuestion.save();
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error('Errore durante la creazione della domanda:', error);
  
      if (error.name === 'ValidationError') {
        const errors = {};
        for (const field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        return res.status(400).json({ message: 'Errore di validazione durante la creazione della domanda', errors });
      }
  
      res.status(500).json({ message: 'Impossibile creare la domanda' });
    }
  };
  
  