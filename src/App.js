import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login';
import Dogs from '../src/pages/Dogs';
import Match from '../src/pages/Match';

import { useState } from 'react';

function App(){
  const [isLoggedIn, setIsLoggIn] = useState(false);

  return(
    <Router>
      <Routes>
        <Route path="/" element={
          <Login 
            onLoginSuccess={()=> setIsLoggIn(true)}/>}></Route>
        <Route path="/dogs" element={isLoggedIn ? <Dogs/> : <Navigate to="/" replace/>}></Route>
        <Route path="/match" element={isLoggedIn ? <Match/> : <Navigate to="/" replace/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;