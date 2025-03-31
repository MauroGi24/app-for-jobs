import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NotFound from './pages/NotFound';
import CreateJobPage from './pages/CreateJobPage';
import JobDetailPage from './pages/JobDetailPage';
import JobList from './components/JobList/JobList';
import { JobContextProvider } from './contexts/JobContext';
import { MessageContextProvider } from './contexts/MessageContext';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <MessageContextProvider>
    <JobContextProvider>
      <Router>
        <NavBar />           
        <Routes>
          <Route path="*" element={<NotFound />}/>
          <Route path="/" element={<JobList />} />
          <Route path="/crea-annuncio" element={<CreateJobPage />} />
          <Route path="/annuncio/:id" element={<JobDetailPage />} />
        </Routes>
      </Router>
    </JobContextProvider>
    </MessageContextProvider>
  );
}

export default App;