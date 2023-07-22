import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import classes from './OrderCard.module.css';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const OrderCard = ({ orderId, from, to, quantity, price, transporterName }) => {
  return (
    <Card
      style={{
        margin: '0 auto',
      }}
    >
      <CardContent>
        <Typography className={classes.orderItem}>
          <div>{orderId}</div>
          <div>{from}</div>
          <div>{to}</div>
          <div>{quantity}</div>
          <div>{price}</div>
          <div>{transporterName}</div>
          <Button
            variant='contained'
            className={classes.iconButton}
            sx={{ backgroundColor: '#243f5f' }}
          >
            <ChatOutlinedIcon /> &nbsp; Chat
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
