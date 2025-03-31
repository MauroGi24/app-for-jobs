import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';


export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  // Con showMessage impostiamo di default il tipo di messaggio a success, utile ad esempio in caso di avvisi generici
  // useCallback memorizza la funzione e la restituisce solo se le dipendenze cambiano
  // In questo modo evitiamo riesecuzioni involontarie di useEffect in componenti che usano showError/showSuccess
  const showMessage = useCallback((text, type = 'success') => {
    setMessage({ text, type });
  }, []); // Dipendenze vuote: la funzione non dipende da variabili esterne

  const showError = useCallback((text) => {
    showMessage(text, 'error');
  }, [showMessage]); // Dipende da showMessage

  const showSuccess = useCallback((text) => {
    showMessage(text, 'success');
  }, [showMessage]);

  const handleClose = () => {
    setMessage(null);
  };

  // Auto-close per messaggi di successo
  useEffect(() => {
    if (message && message.type === 'success') {
      const timer = setTimeout(() => {
        handleClose();
      }, 1000);
      return () => clearTimeout(timer); // Pulisce il timer quando si smonta il componente prima dei 5 secondi o cambia la dipendenza. Se il timer scatta dopo che il componente non esiste più, React proverà a aggiornare uno stato inesistente, causando un errore
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ showMessage, showError, showSuccess }}>
      {children}
      <Snackbar
        open={!!message}
        autoHideDuration={message?.type === 'error' ? null : 2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={message?.type}
          onClose={handleClose}
          icon={message?.type === 'success' ? <CheckIcon /> : <ErrorIcon />}
          sx={{ fontSize: '20px' }}
        >
          {message?.text}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
};