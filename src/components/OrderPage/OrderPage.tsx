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

  const currentOrder = orders.find(order => order.id === Number(orderId)) as OrderType;

  const [buttonCounter, setButtonCounter] = useState<number>(0);

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

  const customerTel = String(currentOrder.customerTel);

  return (
    <div className="order-page">
      <div className="order-page__buttons">
        <button onClick={handleButtonClick} className={`order-page__button ${buttonCounter === 1 ? 'order-page__button_type_warning' : ''}`} aria-label='Кнопка удаления заказа'>Удалить</button>
        <button onClick={handleEditOrder} className="order-page__button" aria-label='Кнопка редактирования заказа'>Редактировать</button>
      </div>
      <p className="order-page__text">Дата создания: <span className="order-page__span">{
        `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</span></p>
      <p className="order-page__text">Город: <span className="order-page__span">{currentOrder?.city}</span></p>
      <p className="order-page__text">Улица: <span className="order-page__span">{currentOrder?.street}</span></p>
      <p className="order-page__text">Дом/квартира: <span className="order-page__span">{`д.${currentOrder?.houseNumber}, кв.${currentOrder?.apartmentNumber}`}</span></p>
      <p className="order-page__text">Заказчик: <span className="order-page__span">{currentOrder?.customer}</span></p>
      <p className="order-page__text">Номер телефона: <a href={`tel: ${currentOrder?.customerTel}`} className="order-page__link page__link">
      {customerTel.length === 11 ? `${customerTel[0]}(${customerTel.slice(1, 4)})${customerTel.slice(4, 7)}-${customerTel.slice(7, 9)}-${customerTel.slice(9, 11)}` : currentOrder.customerTel}
        {/* {currentOrder?.customerTel} */}
        </a></p>
      <p className="order-page__text">Общая сумма: <span className="order-page__span">
        {orderCash.toFixed(0)} руб.</span></p>
      {/* <h2 className="order-page__title">Помещения и услуги:</h2> */}
      <Link to={`/room-form/${orderId}`} className="order-page__addRoomButton page__link" aria-label='Кнопка добавления помещения'>Добавить помещение</Link>
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
            }) : <p className="rooms__info">Пока нет помещений</p>
        }
      </ul>
    </div >
  )
}

export default OrderPage;