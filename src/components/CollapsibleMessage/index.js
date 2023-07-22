import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export const MessageSeverity = {
  warning: 'warning',
  error: 'error',
  info: 'info',
  success: 'success',
};

export default function CollapsibleMessage({
  open,
  severity,
  setOpen,
  message,
}) {
  return (
    <Box sx={{ width: '100%', marginTop: '15px !important' }}>
      <Collapse in={open}>
        <Alert
          variant='outlined'
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
