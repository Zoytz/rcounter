import React, { FC, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { OrderType } from '../OrdersForm/OrdersForm';
import RoomCard, { RoomServiceType } from '../RoomCard/RoomCard';
import { RoomType } from '../RoomForm/RoomForm';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  orders: Array<OrderType>
  rooms: Array<RoomType>
  services: Array<ServiceType>
  roomsServices: Array<RoomServiceType>
  handleDeleteOrder: (param: number) => void
  handleDeleteRoom: (param: number) => void
  handleAddRoomService: (param: RoomServiceType) => void
  handleUpdateRoomServices: (param: RoomServiceType) => void
  handleDeleteRoomServices: (param: number) => void
}

const OrderPage: FC<PropsType> = ({ orders, handleDeleteOrder, rooms, handleDeleteRoom, services, handleAddRoomService, roomsServices, handleUpdateRoomServices, handleDeleteRoomServices }) => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  const [buttonCounter, setButtonCounter] = useState<number>(0);

  const ordersFromLS: OrderType[] = JSON.parse(localStorage.getItem('orders')!);
  const currentOrder: OrderType = ordersFromLS.find(order => order.id === Number(orderId))!;

  const currentRooms = rooms.filter((room) => room.orderId === Number(orderId));

  const handleButtonClick = () => {
    if (buttonCounter === 0) {
      setButtonCounter(buttonCounter + 1);
    } else if (buttonCounter === 1) {
      setButtonCounter(0);
      handleDeleteOrder(Number(orderId));
      navigate('/orders');
    }
  }

  const orderCash = roomsServices.filter((roomService) => roomService.orderId === Number(orderId)).reduce((prev, item) => prev + item.cash, 0);

  const date = new Date(Number(orderId));

  const handleEditOrder = () => {
    navigate(`/order-edit/${orderId}`)
  }

  const customerTel = String(currentOrder!.customerTel);

  return (
    <div className="order-page">
      <div className="order-page__buttons">
        <button onClick={handleButtonClick} className={`order-page__button ${buttonCounter === 1 ? 'order-page__button_type_warning' : ''}`} aria-label='???????????? ???????????????? ????????????'>??????????????</button>
        <button onClick={handleEditOrder} className="order-page__button" aria-label='???????????? ???????????????????????????? ????????????'>??????????????????????????</button>
      </div>
      <p className="order-page__text">???????? ????????????????: <span className="order-page__span">{
        `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</span></p>
      <p className="order-page__text">??????????: <span className="order-page__span">{currentOrder?.city}</span></p>
      <p className="order-page__text">??????????: <span className="order-page__span">{currentOrder?.street}</span></p>
      <p className="order-page__text">??????/????????????????: <span className="order-page__span">{`??.${currentOrder?.houseNumber}, ????.${currentOrder?.apartmentNumber}`}</span></p>
      <p className="order-page__text">????????????????: <span className="order-page__span">{currentOrder?.customer}</span></p>
      <p className="order-page__text">?????????? ????????????????: <a href={`tel: ${currentOrder?.customerTel}`} className="order-page__link page__link">
        {customerTel.length === 11 ? `${customerTel[0]}(${customerTel.slice(1, 4)})${customerTel.slice(4, 7)}-${customerTel.slice(7, 9)}-${customerTel.slice(9, 11)}` : currentOrder.customerTel}
        {/* {currentOrder?.customerTel} */}
      </a></p>
      <p className="order-page__text">?????????? ??????????: <span className="order-page__span">
        {orderCash.toFixed(0)} ??????.</span></p>
      {/* <h2 className="order-page__title">?????????????????? ?? ????????????:</h2> */}
      <Link to={`/room-form/${orderId}`} className="order-page__addRoomButton page__link" aria-label='???????????? ???????????????????? ??????????????????'>???????????????? ??????????????????</Link>
      <ul className="rooms page__list">
        {
          currentRooms.length !== 0 ?
            [...currentRooms].reverse().map((currentRoom: RoomType) => {
              return (
                <RoomCard
                  key={currentRoom.id}
                  currentRoom={currentRoom}
                  handleDeleteRoom={handleDeleteRoom}
                  services={services}
                  handleAddRoomService={handleAddRoomService}
                  roomsServices={roomsServices}
                  handleUpdateRoomServices={handleUpdateRoomServices}
                  handleDeleteRoomServices={handleDeleteRoomServices}
                />
              )
            }) : <p className="rooms__info">???????? ?????? ??????????????????</p>
        }
      </ul>
    </div >
  )
}

export default OrderPage;