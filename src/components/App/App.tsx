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
import { RoomServiceType } from '../RoomCard/RoomCard';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';

function App() {

  const [services, setServices] = React.useState<Array<ServiceType>>([]);
  const [orders, setOrders] = React.useState<Array<OrderType>>([]);
  const [rooms, setRooms] = React.useState<Array<RoomType>>([]);
  const [roomsServices, setRoomsServices] = React.useState<Array<RoomServiceType>>([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (localStorage.getItem('services') && JSON.parse(localStorage.getItem('services')!).length > 0 && services.length === 0) {
      const servicesFromLS: Array<ServiceType> = JSON.parse(localStorage.getItem('services')!);
      setServices(servicesFromLS);
    }
  }, [services]);

  React.useEffect(() => {
    if (localStorage.getItem('orders') && JSON.parse(localStorage.getItem('orders')!).length > 0 && orders.length === 0) {
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

  React.useEffect(() => {
    if (localStorage.getItem('roomsServices') && JSON.parse(localStorage.getItem('roomsServices')!).length > 0 && roomsServices.length === 0) {
      const roomServicesFromLS: Array<RoomServiceType> = JSON.parse(localStorage.getItem('roomsServices')!);
      setRoomsServices(roomServicesFromLS);
    }
  }, [roomsServices]);

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
    const roomsServicesArr: Array<RoomServiceType> = roomsServices;
    const newRoomsServicesArr = roomsServicesArr.filter((roomsService) => roomsService.orderId !== delitedOrderId);
    setRoomsServices(newRoomsServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(newRoomsServicesArr))

    const roomsArr: Array<RoomType> = rooms;
    const newRoomsArr = roomsArr.filter((room) => room.orderId !== Number(delitedOrderId));
    setRooms(newRoomsArr);
    localStorage.setItem('rooms', JSON.stringify(newRoomsArr));

    const ordersArr: Array<OrderType> = orders;
    const newOrdersArr: Array<OrderType> = ordersArr.filter(order => order.id !== delitedOrderId);
    setOrders(newOrdersArr);
    localStorage.setItem('orders', JSON.stringify(newOrdersArr));
    handleSaveDeletedOrder(delitedOrderId);
  }

  const handleSaveDeletedOrder = (id: number) => {
    const deletedOrder = orders.find((order) => order.id === id);
    const deletedOrderRooms = rooms.filter((room) => room.orderId === id);
    deletedOrderRooms.forEach((deletedOrderRoom) => handleSaveDeletedRoom(deletedOrderRoom.id));
    if(localStorage.getItem('deletedOrders')) {
      const deletedOrdersArr = JSON.parse(localStorage.getItem('deletedOrders')!);
      deletedOrdersArr.push(deletedOrder);
      localStorage.setItem('deletedOrders', JSON.stringify(deletedOrdersArr));
    } else {
      localStorage.setItem('deletedOrders', JSON.stringify([deletedOrder]));
    }
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
    const roomsServicesArr: Array<RoomServiceType> = roomsServices;
    const newRoomsServicesArr = roomsServicesArr.filter((roomsService) => roomsService.roomId !== deletedRoomId);
    setRoomsServices(newRoomsServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(newRoomsServicesArr));
    handleSaveDeletedRoom(deletedRoomId);
  }

  const handleSaveDeletedRoom = (id: number) => {
    const deletedRoom = rooms.find((room) => room.id === id);
    const deletedRoomServices = roomsServices.filter((roomsService) => roomsService.roomId === id);
    deletedRoomServices.forEach((deledRoomService) => handleSaveDeletedRoomServices(deledRoomService.id));
    if(localStorage.getItem('deletedRooms')) {
      const deletedRoomsArr = JSON.parse(localStorage.getItem('deletedRooms')!);
      deletedRoomsArr.push(deletedRoom);
      localStorage.setItem('deletedRooms', JSON.stringify(deletedRoomsArr));
    } else {
      localStorage.setItem('deletedRooms', JSON.stringify([deletedRoom]));
    }
  }

  const handleAddRoomService = (newRoomService: RoomServiceType): void => {
    const roomsServicesArr = roomsServices;
    roomsServicesArr.push(newRoomService);
    setRoomsServices(roomsServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(roomsServicesArr));
  }

  const handleUpdateRoomServices = (updatedRoomService: RoomServiceType): void => {
    const roomsServicesArr = roomsServices;
    const updatedRoomServicesArr = roomsServicesArr.map((roomsService) => {
      if (roomsService.id !== updatedRoomService.id) {
        return roomsService;
      } else {
        return updatedRoomService;
      };
    })
    setRoomsServices(updatedRoomServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(updatedRoomServicesArr));
  }

  const handleDeleteRoomServices = (deletedServiceId: number): void => {
    const roomsServicesArr = roomsServices;
    const updatedRoomServicesArr = roomsServicesArr.filter((roomsService) => roomsService.id !== deletedServiceId);
    setRoomsServices(updatedRoomServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(updatedRoomServicesArr));
    handleSaveDeletedRoomServices(deletedServiceId);
  }

  const handleSaveDeletedRoomServices = (id: number) => {
    const delitedService = roomsServices.find((roomsSercice) => roomsSercice.id === id);
    if(localStorage.getItem('deletedRoomsServices')) {
      const updatedDeletedRoomsServices = JSON.parse(localStorage.getItem('deletedRoomsServices')!);
      updatedDeletedRoomsServices.push(delitedService);
      localStorage.setItem('deletedRoomsServices', JSON.stringify(updatedDeletedRoomsServices));
    } else {
      localStorage.setItem('deletedRoomsServices', JSON.stringify([delitedService]));
    }
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  }

  const handleClosePopup = () => {
    setIsMenuOpen(false);
  }

  return (
    <>
    <Modal onClose={handleClosePopup} isMenuOpen={isMenuOpen} handleClosePopup={handleClosePopup}/>
    <div className='page'>
      <Header handleOpenMenu={handleOpenMenu} />
      <Routes>
        <Route path='/rcounter' element={orders.length !== 0 ? <Navigate to="/rcounter/orders" /> : <StartScreen />} />
        <Route path="/rcounter/add-services" element={
          <ServicesForm
            handleServicesFormSubmit={handleServicesFormSubmit}
          />}
        />
        <Route path="/rcounter/add-orders" element={
          <OrdersForm handleOrdersFormSubmit={handleOrdersFormSubmit} />}
        />
        <Route path="/rcounter/orders" element={orders.length === 0 ? <Navigate to="/rcounter" /> : <OrdersList orders={orders} />} />
        <Route path="*" element={<Page404 />} />

        <Route path='/rcounter/orders/:orderId'
          element={<OrderPage
            handleDeleteOrder={handleDeleteOrder}
            orders={orders}
            rooms={rooms}
            handleDeleteRoom={handleDeleteRoom}
            services={services}
            handleAddRoomService={handleAddRoomService}
            roomsServices={roomsServices}
            handleUpdateRoomServices={handleUpdateRoomServices}
            handleDeleteRoomServices={handleDeleteRoomServices}
          />}
        />

        <Route path='/rcounter/room-form/:orderId' element={<RoomForm handleAddRooms={handleAddRooms} />} />
        <Route path='/rcounter/services' element={<ServicesList handleDeleteService={handleDeleteService} services={services} />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
