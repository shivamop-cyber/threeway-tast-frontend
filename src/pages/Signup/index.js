import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../../utils/axios';
import LoadingModal from '../../components/LoadingModal';
import { urlMap } from '../../utils/url';
import CollapsibleMessage, {
  MessageSeverity,
} from '../../components/CollapsibleMessage';
import { USER_TYPE } from '../../utils/constants';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        Shipment Dashboard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState('All');
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [collapsibleProperties, setCollapsibleProperties] = React.useState({
    severity: MessageSeverity.info,
    message: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsModalOpen(true);

    const responseData = await postData(urlMap.register, {
      name: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      password: data.get('password'),
      address: data.get('address'),
      userType: data.get('userType'),
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

  const handleFilterChange = (event) => {
    const val = event.target.value;
    setFilterValue(val);
  };

  return isModalOpen ? (
    <LoadingModal open={isModalOpen} message={'Signing up.....'} />
  ) : (
    <>
      <CollapsibleMessage
        open={isCollapsibleOpen}
        setOpen={setIsCollapsibleOpen}
        severity={collapsibleProperties.severity}
        message={collapsibleProperties.message}
      />
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              marginTop: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#0c5285' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='address'
                    label='Address'
                    id='address'
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor='outlined-transporter-native-simple'>
                    Register as
                  </InputLabel>
                  <Select
                    defaultValue={USER_TYPE.MANUFACTURER}
                    style={{ minWidth: 250 }}
                    name='userType'
                    id='outlined-transporter-native-simple'
                  >
                    <MenuItem value={USER_TYPE.MANUFACTURER}>
                      {USER_TYPE.MANUFACTURER}
                    </MenuItem>
                    <MenuItem value={USER_TYPE.TRANSPORTER}>
                      {USER_TYPE.TRANSPORTER}
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, backgroundColor: '#243f5f' }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/Login' variant='body2' sx={{ color: '#243f5f' }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
