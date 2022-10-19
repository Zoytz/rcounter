import React from 'react';
import StartScreen from '../StartScreen/StartScreen';
import { Routes, Route } from 'react-router-dom';
import { Page404 } from '../Page404/Page404';
import ServicesForm from '../ServicesForm/ServicesForm';

function App() {
  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<StartScreen />}/>
        <Route path="/add_services" element={<ServicesForm />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
      
    </div>
  )
}

export default App;
