import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getData, postData } from '../../utils/axios';
import LoadingModal from '../../components/LoadingModal';
import { urlMap } from '../../utils/url';
import CollapsibleMessage, {
  MessageSeverity,
} from '../../components/CollapsibleMessage';
import { USER_TYPE } from '../../utils/constants';

const theme = createTheme();

const OrderForm = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const [transporters, setTransporters] = React.useState([
    { _id: 'loading', name: 'loading....' },
  ]);

  React.useEffect(() => {
    const fetchTransporters = async () => {
      const responseData = await getData(urlMap.getTransporters);
      setTransporters(responseData.transporters);
    };

    fetchTransporters();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsModalOpen(true);

    const responseData = await postData(urlMap.createOrder, {
      from: data.get('from'),
      to: data.get('to'),
      quantity: data.get('quantity'),
      transporter: data.get('transporter'),
    });
    setIsModalOpen(false);
    setCollapsibleProperties({
      severity:
        responseData.success === true
          ? MessageSeverity.success
          : MessageSeverity.error,
      message: responseData.message,
    });
    setIsCollapsibleOpen(true);
  };

  return isModalOpen ? (
    <LoadingModal open={isModalOpen} message={'Signing up.....'} />
  ) : (
    <>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CollapsibleMessage
              open={isCollapsibleOpen}
              setOpen={setIsCollapsibleOpen}
              severity={collapsibleProperties.severity}
              message={collapsibleProperties.message}
            />
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='from'
                    label='from'
                    name='from'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth name='to' label='To' id='to' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='quantity'
                    label='Quantity (in ton)'
                    id='quantity'
                    type='number'
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor='outlined-transporter-native-simple'>
                    Transporter
                  </InputLabel>
                  <Select
                    defaultValue={transporters[0]._id}
                    style={{ minWidth: 250 }}
                    name='transporter'
                    id='outlined-transporter-native-simple'
                  >
                    {transporters.map((transporter) => {
                      return (
                        <MenuItem key={transporter._id} value={transporter._id}>
                          {transporter.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, backgroundColor: '#243f5f' }}
              >
                Create Order
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default OrderForm;
