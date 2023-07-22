import React from 'react';
import OrderCard from '../OrderCard';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import classes from './Orders.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { getUserType } from '../../utils/auth';
import { USER_TYPE } from '../../utils/constants';

const Orders = ({ orders }) => {
  const [displayedOrders, setDisplayedOrders] = React.useState(orders);

  const handleSearch = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const searchInput = data.get('searchInput').toLowerCase();

    if (searchInput === '') {
      setDisplayedOrders(orders);
    } else {
      const filteredDisplayed = orders.filter((data) => {
        return (
          data.from.toLowerCase().includes(searchInput) ||
          data.orderId.toLowerCase().includes(searchInput) ||
          data.to.toLowerCase().includes(searchInput)
        );
      });
      setDisplayedOrders(filteredDisplayed);
    }
  };

  return (
    <div>
      <Box
        component='form'
        onSubmit={handleSearch}
        noValidate
        sx={{ mt: 1 }}
        className={classes.searchBox}
      >
        <div className={classes.innerSearchContainer}>
          <TextField
            type='text'
            placeholder='Search to, from or order id'
            variant='outlined'
            fullWidth
            required
            style={{ paddingTop: '7px', marginRight: '10px' }}
            name='searchInput'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ backgroundColor: '#243f5f', mt: 1, width: '20px' }}
          >
            <SearchIcon />
          </Button>
        </div>
      </Box>
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
          <div>
            {getUserType() === USER_TYPE.MANUFACTURER
              ? 'Transporter'
              : 'Pickup Address'}
          </div>
          <div>Chat</div>
        </CardContent>
        {displayedOrders.map((order) => (
          <OrderCard
            orderId={order.orderId}
            from={order.from}
            to={order.to}
            quantity={order.quantity}
            price={order.price}
            transporterName={order.transporter.name}
            key={order._id}
            address={order.pickup}
          />
        ))}
      </Card>
    </div>
  );
};

export default Orders;
