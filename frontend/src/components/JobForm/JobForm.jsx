import './JobForm.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobContext } from '../../contexts/JobContext';
import { MessageContext } from '../../contexts/MessageContext';
import { createJob } from '../../services/fetchJob';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Typography, TextField, Button, FormControl, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const JobForm = () => {
  const { showError, showSuccess } = useContext(MessageContext);
  const { addJob } = useContext(JobContext);
  const navigate = useNavigate();

  
  const initialValues = {
    title: '',
    salary: {
      base: '',
      equity: '',
      bonus: '',
    },
    benefits: '',
    description: '',
    team_info: '',
    stock_options: {
      percentage: '',
      estimated_value: '',
    },
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Inserisci un titolo')
      .min(3, 'Il titolo deve avere almeno 3 caratteri')
      .max(100, 'Il titolo non può superare i 100 caratteri'),
    salary: Yup.object({
      base: Yup.number()
        .required('Inserisci lo stipendio base')
        .min(0, 'Lo stipendio base deve essere un numero positivo')
        .integer('Lo stipendio base deve essere un numero intero'),
      bonus: Yup.number()   
        .integer('Il bonus deve essere un numero intero')
        .min(0, 'Il bonus deve essere un numero positivo')
    }),
    description: Yup.string()
      .required('Inserisci una descrizione')
      .min(10, 'La descrizione deve avere almeno 10 caratteri'),
    stock_options: Yup.object({
      percentage: Yup.number()
        .min(0, 'La percentuale deve essere tra 0 e 100')
        .max(100, 'La percentuale deve essere tra 0 e 100'),
      estimated_value: Yup.number()
        .min(0, 'Il valore stimato deve essere un numero positivo')
    }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await createJob(values)
      addJob(data)
      resetForm();
      showSuccess('Offerta di lavoro creata con successo!')    
    } 
    catch (error) {
      console.error(error);
      showError('Impossibile creare l\'offerta di lavoro. Riprova più tardi!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
        <Form className="job-form">
          <Button sx={{mb: 3}}
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Torna alla Lista
        </Button>
          <Typography variant='h4'>Crea una nuova offerta di lavoro</Typography>
          <Grid container spacing={2}>
            <Grid size= {{xs: 12, sm: 6}}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="title"
                  name="title"
                  label="Titolo"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="salary.base"
                  name="salary.base"
                  label="Stipendio Base"
                  type="number"
                  value={values.salary.base}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.salary?.base && Boolean(errors.salary?.base)}
                  helperText={touched.salary?.base && errors.salary?.base}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="description"
                  name="description"
                  label="Descrizione"
                  multiline
                  rows={10}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </FormControl>
            </Grid>
            <Grid size= {{xs: 12, sm: 6}}>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="salary.equity"
                  name="salary.equity"
                  label="Equity (opzionale)"
                  value={values.salary.equity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.salary?.equity && Boolean(errors.salary?.equity)}
                  helperText={touched.salary?.equity && errors.salary?.equity}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="salary.bonus"
                  name="salary.bonus"
                  label="Bonus (opzionale)"
                  type="number"
                  value={values.salary.bonus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.salary?.bonus && Boolean(errors.salary?.bonus)}
                  helperText={touched.salary?.bonus && errors.salary?.bonus}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="benefits"
                  name="benefits"
                  label="Benefit (opzionale)"
                  multiline
                  rows={4}
                  value={values.benefits}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.benefits && Boolean(errors.benefits)}
                  helperText={touched.benefits && errors.benefits}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  id="team_info"
                  name="team_info"
                  label="Informazioni sul Team (opzionale)"
                  multiline
                  rows={2}
                  value={values.team_info}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.team_info && Boolean(errors.team_info)}
                  helperText={touched.team_info && errors.team_info}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Crea Offerta
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default JobForm;