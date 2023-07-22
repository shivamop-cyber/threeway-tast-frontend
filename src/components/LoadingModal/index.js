import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.transparent',
  p: 4,
};

export default function LoadingModal({ message, open }) {
  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Typography
            variant='h5'
            component='h2'
            sx={{ color: '#fff', marginBottom: '10px' }}
          >
            {message}
          </Typography>
          <CircularProgress color='secondary' />
        </Box>
      </Modal>
    </div>
  );
}
