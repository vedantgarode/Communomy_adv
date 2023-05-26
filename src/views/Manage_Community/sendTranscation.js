import React, { useState,useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Transcation_Form from './Transcation_Form';

const SendTranscation = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(true); // Added loading state

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // Simulating an async operation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array to run only once

  if (loading) {
    // Show loading indicator while loading
    return <CircularProgress />;
  }
  //console.log('Riw', row);
  return (
    <>
      <Button variant="outlined" color="success" onClick={handleClickOpen('paper')}>
        Send
      </Button>
      <Dialog
        open={open}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'md'}
      >
        <DialogTitle id="scroll-dialog-title">
          <Box component="span" m={1} display="flex" justifyContent="space-between" alignItems="center">
            Send Amount to {row}
            <CloseRoundedIcon onClick={handleClose} style={{ color: '#ff5252' }} boxShadow={1} />
          </Box>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Transcation_Form row={row} handleClickClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SendTranscation;
