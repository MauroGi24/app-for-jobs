import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { JobContext } from '../../contexts/JobContext';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField} from '@mui/material'; 

const columns = [
  { id: 'createdAt', label: 'Data Aggiunta', minWidth: 170 },
  { id: 'updatedAt', label: 'Ultima Modifica', minWidth: 170 },
  { id: 'title', label: 'Titolo', minWidth: 170 },
  { id: 'description', label: 'Descrizione', minWidth: 300 },
];

const JobList = () => {
  const { jobs } = useContext(JobContext);
  const navigate = useNavigate(); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]); 

  useEffect(() => {
    if (jobs) {
      const newFilteredJobs = jobs.filter(job =>
        (job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredJobs(newFilteredJobs);
    }
  }, [jobs, searchTerm]);

  useEffect(() => {
    setPage(0); 
  }, [filteredJobs]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id) => {
    navigate(`/annuncio/${id}`);
  };

  return (
    <Paper sx={{ overflow: 'hidden', padding:"40px", margin:"40px" }}>
      <TextField
        label="Cerca..."
        placeholder='Cerca per titolo o descrizione...'
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>      
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>           
          </TableHead>
          <TableBody>
            {filteredJobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={job._id} onClick={() => handleRowClick(job._id)} sx={{ cursor: 'pointer' }}>
                  {columns.map((column) => {
                    const value = job[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : column.id === 'createdAt' || column.id === 'updatedAt'
                          ? new Date(value).toLocaleDateString('it-IT')
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>              
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredJobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Righe per pagina:"
      />
    </Paper>
  );
};

export default JobList;