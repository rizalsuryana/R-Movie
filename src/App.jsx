import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

function App() {

  return (
    <>
      <p>Movie</p>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;
