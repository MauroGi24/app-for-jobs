import React, { createContext, useState, useContext, useEffect } from 'react';
import { MessageContext } from './MessageContext';
import { fetchJobs } from '../services/fetchJob';

export const JobContext = createContext();

export const JobContextProvider = ({ children }) => {
  const { showError, showMessage } = useContext(MessageContext);
  const [jobs, setJobs] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      showMessage('Caricamento in corso...');
      const loadJobs = async () => {
        try {
          const data = await fetchJobs();
          setJobs(data);
          setIsInitialized(true);
        } catch (error) {
          showError('Impossibile caricare gli annunci. Riprova più tardi!');
        }
      };
      loadJobs();
    }
  }, [isInitialized]);

  
  // Aggiorniamo il contesto con le nuove domande
  const addQuestion = (jobId, newQuestion) => {
    setJobs(prevJobs => prevJobs.map(job => job.id === jobId 
          ? { ...job, questions: [...(job.questions), newQuestion] }
          : job
      )
    );
  };
    
  // Aggiorniamo il contesto con i nuovi dati del nuovo annuncio
  const addJob = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  return (
    <JobContext.Provider value={{jobs, addJob, addQuestion}}>
      {children}
    </JobContext.Provider>
  );
};