import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Manufacturer from './pages/Manufacturer';

function App() {
  return (
    <>
      <Navbar />
      <AnimatePresence>
        <Routes>
          <Route exact path='/' element={<Manufacturer />} />

          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
export default App;
