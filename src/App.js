import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Manufacturer from './pages/Manufacturer';
import { getUserType } from './utils/auth';
import { USER_TYPE } from './utils/constants';
import Transporter from './pages/Transporter';
import Chat from './pages/Chat';

function App() {
  return (
    <>
      <Navbar />
      <AnimatePresence>
        <Routes>
          <Route
            exact
            path='/'
            element={
              getUserType() === USER_TYPE.MANUFACTURER ? (
                <Manufacturer />
              ) : (
                <Transporter />
              )
            }
          />

          <Route exact path='/chat/:orderId' element={<Chat />} />

          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
export default App;
