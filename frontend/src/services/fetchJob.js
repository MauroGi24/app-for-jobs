export const fetchJobs = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/jobs`);
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("Impossibile caricare gli annunci. Riprova!", error);
    throw error;
  }
}; 

export const createJob = async (jobData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("Impossibile creare l\'annuncio. Riprova!", error);
    throw error; 
  }
};


export const jobInfo = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/job/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("Impossibile creare i dettagli dell\'annuncio. Riprova!", error);
    throw error; 
  }
};



export const createQuestion = async (id, questionData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/job/${id}/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });
    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return await response.json();
    } 
  catch (error) {
    console.error("Impossibile creare la domanda. Riprova!", error);
    throw error; 
  }
}