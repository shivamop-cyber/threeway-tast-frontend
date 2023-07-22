import React from 'react';
import OrderCard from '../OrderCard';
import { Card, CardContent } from '@mui/material';
import classes from './Orders.module.css';

const Orders = ({ orders }) => {
  return (
    <div>
      <Card
        className=''
        style={{
          maxWidth: 1400,
          padding: '20px 5px',
          margin: '0 auto',
        }}
      >
        <CardContent className={classes.orderCardContainer}>
          <div>Order ID</div>
          <div>From</div>
          <div>To</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Transporter</div>
          <div>Chat</div>
        </CardContent>
        {orders.map((order) => (
          <OrderCard
            orderId={order.orderId}
            from={order.from}
            to={order.to}
            quantity={order.quantity}
            price={order.price}
            transporterName={order.transporter.name}
            key={order._id}
          />
        ))}
      </Card>
    </div>
  );
};

export default Orders;
