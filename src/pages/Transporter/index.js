import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Transporter.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import { getData } from '../../utils/axios';
import { urlMap } from '../../utils/url';
import { useNavigate } from 'react-router';
import CollapsibleMessage, {
  MessageSeverity,
} from '../../components/CollapsibleMessage';
import LoadingModal from '../../components/LoadingModal';
import { isLoggedIn } from '../../utils/auth';
import Orders from '../../components/Orders';
import OrderForm from '../../components/OrderForm';
import { Card, CardContent } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Transporter = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }

    setIsModalOpen(true);
    getData(`${urlMap.getMyOrders}`)
      .then((data) => {
        console.log(data.orders);
        setOrders(data.orders);
        setIsModalOpen(false);
      })
      .catch((err) => {
        setIsModalOpen(false);
        console.log(err);
        setCollapsibleProperties({
          severity: MessageSeverity.error,
          message: err.message,
        });
        setIsCollapsibleOpen(true);
      });
  }, []);

  return isModalOpen ? (
    <LoadingModal open={isModalOpen} message={'Loading.....'} />
  ) : (
    orders && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className='adminContainer'>
          <div className='contentsAdmin'>
            <div style={{ color: '#002244', fontWeight: 'bold' }}>
              <h1>Transporter Dashboard</h1>
            </div>
            <CollapsibleMessage
              open={isCollapsibleOpen}
              setOpen={setIsCollapsibleOpen}
              severity={collapsibleProperties.severity}
              message={collapsibleProperties.message}
            />
          </div>
          <div>
            <Box
              sx={{ width: '100%' }}
              style={{ marginTop: '50px', marginLeft: '20px' }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='My Orders' {...a11yProps(0)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div style={{ margin: 'auto' }}>
                  <Orders orders={orders} />
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Transporter;
