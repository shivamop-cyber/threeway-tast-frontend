import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import classes from './OrderCard.module.css';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { getUserType } from '../../utils/auth';
import { USER_TYPE } from '../../utils/constants';
import { postData } from '../../utils/axios';
import { urlMap } from '../../utils/url';
import { Link } from 'react-router-dom';

const OrderCard = ({
  orderId,
  from,
  to,
  quantity,
  price,
  transporterName,
  address,
}) => {
  const handlePriceSet = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const responseData = await postData(urlMap.setPrice, {
      price: data.get('price'),
      orderId: orderId,
    });

    console.log(responseData);
  };

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
          {getUserType() === USER_TYPE.MANUFACTURER ? (
            <div>{price}</div>
          ) : (
            <Box
              component='form'
              onSubmit={handlePriceSet}
              noValidate
              className={classes.priceBox}
            >
              <div className={classes.innerPriceContainer}>
                <TextField
                  type='number'
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                  placeholder='price'
                  variant='outlined'
                  fullWidth
                  required
                  defaultValue={price === undefined ? '0' : price}
                  name='price'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    backgroundColor: '#243f5f',
                    marginLeft: '10px',
                    marginRight: '10px',
                  }}
                >
                  set
                </Button>
              </div>
            </Box>
          )}
          <div>
            {getUserType() === USER_TYPE.MANUFACTURER
              ? transporterName
              : address}
          </div>
          <Link to={`chat/${orderId}`}>
            <Button
              variant='contained'
              className={classes.iconButton}
              sx={{ backgroundColor: '#243f5f' }}
            >
              <ChatOutlinedIcon /> &nbsp; Chat
            </Button>
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
