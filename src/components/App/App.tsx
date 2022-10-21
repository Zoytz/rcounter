import React from 'react';
import StartScreen from '../StartScreen/StartScreen';
import { Routes, Route } from 'react-router-dom';
import { Page404 } from '../Page404/Page404';
import ServicesForm from '../ServicesForm/ServicesForm';

function App() {

  const [services, setServices] = React.useState<Array<ServiceType>>([]);

  React.useEffect(() => {
    if (!localStorage.getItem('services')) {
      return
    } else {
      const servicesFromLS: any = localStorage.getItem('services');
      setServices(JSON.parse(servicesFromLS));
      console.log('Use', services)
    }

  }, []);

  type ServiceType = Record<string, number>

  const handleServicesFormSubmit = (service: ServiceType): void => {
    const servicesArr: Array<ServiceType> = services;
    servicesArr.push(service);
    setServices(servicesArr);
    localStorage.setItem('services', JSON.stringify(servicesArr));
    console.log(localStorage.getItem('services'));
  }

  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route path="/add-services" element={
          <ServicesForm
            handleServicesFormSubmit={handleServicesFormSubmit}
          />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>

    </div>
  )
}

export default App;
