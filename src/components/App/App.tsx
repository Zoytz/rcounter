import React from 'react';
import StartScreen from '../StartScreen/StartScreen';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Page404 } from '../Page404/Page404';
import ServicesForm, { ServiceType } from '../ServicesForm/ServicesForm';
import ServicesList from '../ServicesList/ServicesList';
import OrdersForm, { OrderType } from '../OrdersForm/OrdersForm';
import OrdersList from '../OrdersList/OrdersList';
import OrderPage from '../OrderPage/OrderPage';
import RoomForm, { RoomType } from '../RoomForm/RoomForm';

function App() {

  const [services, setServices] = React.useState<Array<ServiceType>>([]);
  const [orders, setOrders] = React.useState<Array<OrderType>>([]);
  const [rooms, setRooms] = React.useState<Array<RoomType>>([]);

  React.useEffect(() => {
    if (localStorage.getItem('services') && JSON.parse(localStorage.getItem('services')!).length > 0 && services.length === 0) {
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

  React.useEffect(() => {
    if (localStorage.getItem('rooms') && JSON.parse(localStorage.getItem('rooms')!).length > 0 && rooms.length === 0) {
      const roomsFromLS = JSON.parse(localStorage.getItem('rooms')!);
      setRooms(roomsFromLS);
    }
  }, [rooms]);

  const navigate = useNavigate();

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
    navigate('/orders')
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

  const handleAddRooms = (newRoom: RoomType): void => {
    const roomsArr = rooms;
    roomsArr.push(newRoom);
    setRooms(roomsArr);
    localStorage.setItem('rooms', JSON.stringify(roomsArr));
  }

  const handleDeleteRoom = (deletedRoomId: number) => {
    const roomsArr: Array<RoomType> = rooms;
    const newRoomsArr: Array<RoomType> = roomsArr.filter(room => room.id !== deletedRoomId);
    setRooms(newRoomsArr);
    localStorage.setItem('rooms', JSON.stringify(newRoomsArr));
  }

  // const handleAddRoomService = (newRoomService: RoomType): void => {
  //   const roomsServiceArr = rooms;
  //   roomsArr.push(newRoom);
  //   setRooms(roomsArr);
  //   localStorage.setItem('rooms', JSON.stringify(roomsArr));
  // }

  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={orders.length !== 0 ? <Navigate to="/orders" /> : <StartScreen />} />
        <Route path="/add-services" element={
          <ServicesForm
            handleServicesFormSubmit={handleServicesFormSubmit}
          />}
        />
        <Route path="/add-orders" element={
          <OrdersForm handleOrdersFormSubmit={handleOrdersFormSubmit} />}
        />
        <Route path="/orders" element={orders.length === 0 ? <Navigate to="/" /> : <OrdersList orders={orders} />} />
        <Route path="*" element={<Page404 />} />
        <Route path='/orders/:orderId' element={<OrderPage handleDeleteOrder={handleDeleteOrder} orders={orders} rooms={rooms} handleDeleteRoom={handleDeleteRoom} services={services}/>} />
        <Route path='/room-form/:orderId' element={<RoomForm handleAddRooms={handleAddRooms} />} />
        <Route path='/services' element={<ServicesList handleDeleteService={handleDeleteService} services={services} />} />
      </Routes>
    </div>
  )
}

export default App;
