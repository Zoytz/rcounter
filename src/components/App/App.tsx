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
import RoomEditForm from '../RoomEditForm/RoomEditForm';
import OrdersEditForm from '../OrdersEditForm/OrdersEditForm';

function App() {

  const [services, setServices] = React.useState<Array<ServiceType>>([]);
  const [orders, setOrders] = React.useState<Array<OrderType>>([]);
  const [rooms, setRooms] = React.useState<Array<RoomType>>([]);
  const [roomsServices, setRoomsServices] = React.useState<Array<RoomServiceType>>([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    // const servicesFromLS: Array<ServiceType> = JSON.parse(localStorage.getItem('services')!);
    // if (servicesFromLS && servicesFromLS.length > 0) {
    //   setServices(servicesFromLS);
    // }
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

    // const roomServicesFromLS: Array<RoomServiceType> = JSON.parse(localStorage.getItem('roomsServices')!);
    // if (roomServicesFromLS && roomServicesFromLS.length > 0) {
    //   setRoomsServices(roomServicesFromLS);
    // }

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
    const updatedRoomsServicesArr = roomsServices.filter((roomsService: RoomServiceType) => roomsService.value !== delitedService.name);
    setRoomsServices(updatedRoomsServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(updatedRoomsServicesArr));
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

    /* deleted */

    /* services */

    const deletedRoomsServicesArr = roomsServicesArr.filter((roomsService) => roomsService.orderId === delitedOrderId);
    const deletedRoomsServicesArrFromLS = JSON.parse(localStorage.getItem('deletedRoomsServices')!);
    if (deletedRoomsServicesArrFromLS) {
      localStorage.setItem('deletedRoomsServices', JSON.stringify([...deletedRoomsServicesArrFromLS, ...deletedRoomsServicesArr]));
    } else {
      localStorage.setItem('deletedRoomsServices', JSON.stringify(deletedRoomsServicesArr));
    }

    /* rooms */

    const deletedRoomsArr = roomsArr.filter((room) => room.orderId === Number(delitedOrderId));
    const deletedRoomsArrFromLS = JSON.parse(localStorage.getItem('deletedRooms')!);
    if (deletedRoomsArrFromLS) {
      localStorage.setItem('deletedRooms', JSON.stringify([...deletedRoomsArrFromLS, ...deletedRoomsArr]));
    } else {
      localStorage.setItem('deletedRooms', JSON.stringify(deletedRoomsArr));
    }

    /* order */
    const deletedOrder = orders.find((order) => order.id === delitedOrderId);
    const deletedOrdersFromLS = JSON.parse(localStorage.getItem('deletedOrders')!);
    if (deletedOrdersFromLS) {
      localStorage.setItem('deletedOrders', JSON.stringify([...deletedOrdersFromLS, deletedOrder]));
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
    const updatedRoomsServicesArr = roomsServicesArr.filter((roomsService) => roomsService.roomId !== deletedRoomId);
    setRoomsServices(updatedRoomsServicesArr);
    localStorage.setItem('roomsServices', JSON.stringify(updatedRoomsServicesArr));

    const deletedRoomsServicesArr = roomsServicesArr.filter((roomsService) => roomsService.roomId === deletedRoomId);
    const deletedRoomsServicesArrFromLS = JSON.parse(localStorage.getItem('deletedRoomsServices')!);
    if (deletedRoomsServicesArrFromLS) {
      localStorage.setItem('deletedRoomsServices', JSON.stringify([...deletedRoomsServicesArrFromLS, ...deletedRoomsServicesArr]));
    } else {
      localStorage.setItem('deletedRoomsServices', JSON.stringify(deletedRoomsServicesArr));
    }

    const deletedRoom = roomsArr.find((room) => room.id === deletedRoomId);
    const deletedRoomsArrFromLS = JSON.parse(localStorage.getItem('deletedRooms')!);
    if (deletedRoomsArrFromLS) {
      localStorage.setItem('deletedRooms', JSON.stringify([...deletedRoomsArrFromLS, deletedRoom]));
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
    if (localStorage.getItem('deletedRoomsServices')) {
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

  const handleEditRoom = (updatedRoom: RoomType) => {
    const updatedRoomsArr = rooms.map((room) => room.id === updatedRoom.id ? updatedRoom : room);
    setRooms(updatedRoomsArr);
    localStorage.setItem("rooms", JSON.stringify(updatedRoomsArr));
  }

  const handleEditOrder = (updatedOrder: OrderType) => {
    const updatedOrdersArr = orders.map((order) => order.id === updatedOrder.id ? updatedOrder : order);
    setOrders(updatedOrdersArr);
    localStorage.setItem('orders', JSON.stringify(updatedOrdersArr));
  }

  return (
    <>
      <Modal onClose={handleClosePopup} isMenuOpen={isMenuOpen} handleClosePopup={handleClosePopup} />
      <div className='page'>
        <Header handleOpenMenu={handleOpenMenu} />
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
          <Route path="/orders" element={orders.length === 0 ? <Navigate to="/" /> : <OrdersList orders={orders} roomsServices={roomsServices} />} />
          <Route path="*" element={<Page404 />} />

          <Route path='/orders/:orderId'
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

          <Route path='/room-form/:orderId' element={<RoomForm handleAddRooms={handleAddRooms} />} />
          <Route path='/services' element={<ServicesList handleDeleteService={handleDeleteService} services={services} />} />
          <Route path='/room-edit/:roomId' element={<RoomEditForm handleEditRoom={handleEditRoom} />} />
          <Route path='/order-edit/:orderId' element={<OrdersEditForm handleEditOrder={handleEditOrder} />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
