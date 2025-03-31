import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobContext } from "../../contexts/JobContext";
import { MessageContext } from "../../contexts/MessageContext";
import { createQuestion } from "../../services/fetchJob";
import { jobInfo } from "../../services/fetchJob";
import * as Yup from "yup";
import {Card, CardContent, Typography, CardHeader, Button, Grid, Box, Container, TextField, FormControl,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik, Form } from "formik";

const JobDetail = () => {
  const { id } = useParams();
  const { showSuccess, showError } = useContext(MessageContext);
  const { addQuestion } = useContext(JobContext);
  const [job, setJob] = useState([]);
  
  const navigate = useNavigate();    

  useEffect(() => {
    const detailJob = async () => {
      try {
        const data = await jobInfo(id);
        setJob(data)
      } catch (error) {
        console.error(error);
        showError('Annuncio non trovato')    
      }
    }
    detailJob()
  } , [id]);

  const initialValues = {
    user: "",
    question: "",
    job: id,
  };

  const validationSchema = Yup.object({
    user: Yup.string().required("Inserisci il tuo nome"),
    question: Yup.string().required("Inserisci la domanda"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newQuestion = await createQuestion(id, values);
      showSuccess("Domanda inviata con successo!");
  
      // Aggiorna lo stato locale del job
      setJob((prevJob) => ({
        ...prevJob,
        questions: prevJob.questions ? [...prevJob.questions, newQuestion] : [newQuestion],
      }));
  
      // Aggiorna il contesto globale
      addQuestion(id, newQuestion);  
      resetForm();
    } catch (error) {
      console.error("Errore di rete:", error);
      showError("Impossibile inviare la domanda. Riprova più tardi!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
  sx={{
    py: 4,
    bgcolor: "#f4f6f8",
    minHeight: "100vh",
    width: "100%",
  }}
  >
  <Container maxWidth="lg" sx={{ width: "100%", marginTop: "60px" }}>
    <Button
      sx={{ mb: 3 }}
      onClick={() => navigate("/")}
      startIcon={<ArrowBackIcon />}
    >
      Torna alla Lista
    </Button>
    <Grid container spacing={3} direction="column">
      <Grid>
        <Card>
          <CardHeader title="Informazioni Base" />
          <CardContent>
            <Typography><strong>Titolo:</strong> {job.title}</Typography>
            <Typography>
              <strong>Data Aggiunta:</strong> {new Date(job.createdAt).toLocaleDateString("it-IT")}
            </Typography>
            <Typography>
              <strong>Ultima Modifica:</strong> {new Date(job.updatedAt).toLocaleDateString("it-IT")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {job.salary && (
        <Grid>
          <Card>
            <CardHeader title="Stipendio" />
            <CardContent>
              <Typography><strong>Base:</strong> {job.salary.base}</Typography>
              {job.salary.equity && <Typography><strong>Equity:</strong> {job.salary.equity}</Typography>}
              {job.salary.bonus && <Typography><strong>Bonus:</strong> {job.salary.bonus}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      )}
      {job.benefits && (
        <Grid>
          <Card>
            <CardHeader title="Benefits" />
            <CardContent>
              <Typography>{job.benefits}</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {job.description && (
        <Grid>
          <Card>
            <CardHeader title="Descrizione" />
            <CardContent>
              <Typography>{job.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {job.team_info && (
        <Grid>
          <Card>
            <CardHeader title="Informazioni sul Team" />
            <CardContent>
              <Typography>{job.team_info}</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {(job.stock_options?.percentage || job.stock_options?.estimated_value) && (
        <Grid>
          <Card>
            <CardHeader title="Stock Options" />
            <CardContent>
              {job.stock_options?.percentage && (
                <Typography><strong>Percentuale:</strong> {job.stock_options.percentage}%</Typography>
              )}
              {job.stock_options?.estimated_value && (
                <Typography><strong>Valore Stimato:</strong> {job.stock_options.estimated_value}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form>
            <Card sx={{ width: '100%' }}>
              <CardHeader title={<Typography variant="h6">Fai una domanda</Typography>} />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="user"
                      name="user"
                      label="Il tuo nome"
                      variant="outlined"
                      value={values.user}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.user && Boolean(errors.user)}
                      helperText={touched.user && errors.user}
                      sx={{ mb: 2 }}
                    />
                  </FormControl>
                  
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="question"
                      name="question"
                      label="Scrivi la tua domanda"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={values.question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.question && Boolean(errors.question)}
                      helperText={touched.question && errors.question}
                    />
                  </FormControl>
    
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Invia Domanda
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Form>
          )}
        </Formik>
      </Grid>
      <Grid>
        <Card>
          <CardHeader title="Domande" />
          <CardContent>
            {job?.questions?.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {job.questions.map((q) => (
                  <Card key={q._id} variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1"><strong>{q.user}</strong></Typography>
                      <Typography>{q.question}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(q.createdAt).toLocaleString("it-IT")}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography>Nessuna domanda per questo annuncio</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>      
    </Grid>
  </Container>
  </Box>
  );
};

export default JobDetail;
