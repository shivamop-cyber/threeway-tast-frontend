import { useNavigate, useParams } from 'react-router';
import { getUserType, isLoggedIn } from '../../utils/auth';
import { styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import classes from './chat.module.css';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { getData } from './../../utils/axios/index';
import { urlMap } from '../../utils/url';

const socket = io('http://localhost:4500');

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const ChatMessage = ({ message, avatarTitle }) => {
  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: 'auto',
        p: 2,
      }}
    >
      <Grid container wrap='nowrap' spacing={2}>
        <Grid item>
          <Avatar>{avatarTitle}</Avatar>
        </Grid>
        <Grid item xs>
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  const senderType = getUserType();
  const { orderId } = useParams();

  useEffect(() => {
    socket.on('chat message', ({ orderId, senderType, message }) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { orderId, senderType, message },
      ]);
    });

    socket.on('connect', () => {
      socket.emit('join order', orderId);
    });

    return () => {
      socket.off('chat message');
      socket.off('connect');
    };
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }

    const getMessages = async () => {
      const response = await getData(urlMap.getOrderMessages + '/' + orderId);
      console.log(response);

      setChatMessages(response.messages);
      console.log(response.messages);
    };

    getMessages();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('chat message', { orderId, senderType, message });
      setMessage('');
    }

    setMessage('');
  };

  return (
    <div>
      <Card
        style={{
          margin: '0 auto',
        }}
        className={classes.chatContainer}
      >
        <CardContent className={classes.innerChatContainer}>
          <div>
            {chatMessages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.message}
                avatarTitle={
                  senderType === msg.senderType ? 'You' : msg.senderType[0]
                }
                className={
                  senderType === msg.senderType
                    ? classes.selfChat
                    : classes.otherChat
                }
              />
            ))}
          </div>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            className={classes.searchBox}
          >
            <div className={classes.innerSearchContainer}>
              <TextField
                type='text'
                placeholder='message'
                variant='outlined'
                fullWidth
                required
                style={{ paddingTop: '7px', marginRight: '10px' }}
                name='message'
                value={message}
                onChange={(newValue) => {
                  setMessage(newValue.target.value);
                }}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ backgroundColor: '#243f5f', mt: 1, width: '20px' }}
              >
                send
              </Button>
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
