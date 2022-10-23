import React from 'react';
import StartScreen from '../StartScreen/StartScreen';
import { Routes, Route } from 'react-router-dom';
import { Page404 } from '../Page404/Page404';
import ServicesForm from '../ServicesForm/ServicesForm';
import ServicesList from '../ServicesList/ServicesList';

function App() {

  const [services, setServices] = React.useState<Array<ServiceType>>([]);
  
  
  React.useEffect(() => {
    if (!localStorage.getItem('services')) {
      console.log('tut')
      return
    } else {
      console.log('ili tut')
      const servicesFromLS: any = JSON.parse(localStorage.getItem('services')!);
      setServices(servicesFromLS);
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
        <Route path='/services' element={<ServicesList services={services} />} />
      </Routes>

    </div>
  )
}

export default App;
