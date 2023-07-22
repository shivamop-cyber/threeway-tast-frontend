import { useNavigate, useParams } from 'react-router';
import { getUserType, isLoggedIn } from '../../utils/auth';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import classess from './chat.module.css';
import { Card, CardContent, Paper } from '@mui/material';
import { getData } from './../../utils/axios/index';
import { urlMap } from '../../utils/url';

const socket = io('http://localhost:4500');

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
  };

  return (
    <div className={classess.chatContainer}>
      <Card
        style={{
          margin: '0 auto',
        }}
      >
        <CardContent>
          <div>
            {chatMessages.map((msg, index) => (
              <Paper key={index}>
                {(senderType === msg.senderType ? 'You' : msg.senderType) +
                  ' : ' +
                  msg.message}
              </Paper>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Type your message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit'>Send</button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
