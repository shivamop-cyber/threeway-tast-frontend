import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { isLoggedIn } from '../../utils/auth';

const Chat = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  console.log(orderId);

  React.useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, []);

  return <div>Chat</div>;
};

export default Chat;
