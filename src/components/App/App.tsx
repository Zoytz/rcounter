import React from 'react';
import StartScreen from '../StartScreen/StartScreen';
import { Routes, Route } from 'react-router-dom';
import { Page404 } from '../Page404/Page404';
import ServicesForm, { ServiceType } from '../ServicesForm/ServicesForm';
import ServicesList from '../ServicesList/ServicesList';
import OrdersForm, { OrderType } from '../OrdersForm/OrdersForm';
import OrdersList from '../OrdersList/OrdersList';
import OrderPage from '../OrderPage/OrderPage';

function App() {

  const [services, setServices] = React.useState<Array<ServiceType>>([]);
  const [orders, setOrders] = React.useState<Array<OrderType>>([]);

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('services')!).length > 0 && services.length === 0) {
      const servicesFromLS: Array<ServiceType> = JSON.parse(localStorage.getItem('services')!);
      setServices(servicesFromLS);
    }
  }, [services]);

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('orders')!).length > 0 && orders.length === 0) {
      const ordersFromLS: Array<OrderType> = JSON.parse(localStorage.getItem('orders')!);
      setOrders(ordersFromLS);
    }
  }, [orders]);

  const handleServicesFormSubmit = (service: ServiceType): void => {
    const servicesArr: Array<ServiceType> = services;
    servicesArr.push(service);
    setServices(servicesArr);
    localStorage.setItem('services', JSON.stringify(servicesArr));
  }

  const handleOrdersFormSubmit = (order: OrderType): void => {
    const ordersArr: Array<OrderType> = orders;
    ordersArr.push(order);
    setOrders(ordersArr);
    localStorage.setItem('orders', JSON.stringify(ordersArr));
  }

  const handleDeleteService = (delitedService: ServiceType): void => {
    const servicesArr: Array<ServiceType> = services;
    const newServicesArr: Array<ServiceType> = servicesArr.filter(service => service.name !== delitedService.name);
    setServices(newServicesArr);
    localStorage.setItem('services', JSON.stringify(newServicesArr));
  }

  const handleDeleteOrder = (delitedOrderId: number): void => {
    const ordersArr: Array<OrderType> = orders;
    const newOrdersArr: Array<OrderType> = ordersArr.filter(order => order.id !== delitedOrderId);
    setOrders(newOrdersArr);
    localStorage.setItem('orders', JSON.stringify(newOrdersArr));
  }

  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={orders.length !== 0 ? <OrdersList orders={orders} /> : <StartScreen />} />
        <Route path="/add-services" element={
          <ServicesForm
            handleServicesFormSubmit={handleServicesFormSubmit}
          />}
        />
        <Route path="/add-orders" element={
          <OrdersForm handleOrdersFormSubmit={handleOrdersFormSubmit} />}
        />
        <Route path="/orders" element={<OrdersList orders={orders} />} />
        <Route path="*" element={<Page404 />} />
        <Route path='/orders/:orderId' element={<OrderPage handleDeleteOrder={handleDeleteOrder} orders={orders}/>} />
        <Route path='/services' element={<ServicesList handleDeleteService={handleDeleteService} services={services} />} />
      </Routes>
    </div>
  )
}

export default App;
