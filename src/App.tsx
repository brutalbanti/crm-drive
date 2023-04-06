import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase/config';
import { Home } from './Pages/Home';
import { Authentication } from './Pages/Authentication';
import { Users } from './Pages/Users';
import { Trips } from './Pages/Trips';

function App() {
  const [authCheker, setAuthCheker] = useState<boolean>(false);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthCheker(true)
      } else {
        setAuthCheker(false);
      }
    })
  }, [])

  return (
    <BrowserRouter>
      {authCheker &&
        <Header />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path='/users' element={<Users />} />
        <Route path='/trips' element={<Trips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
