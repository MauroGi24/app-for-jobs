import JobForm from '../components/JobForm/JobForm.jsx';
import { Container } from '@mui/material';

const CreateJobPage = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <JobForm />
    </Container>
  );
};

export default CreateJobPage;