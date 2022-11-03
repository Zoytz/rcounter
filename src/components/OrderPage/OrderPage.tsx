import React, { FC, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { OrderType } from '../OrdersForm/OrdersForm';

type PropsType = {
  orders: Array<OrderType>
  handleDeleteOrder: (param: number) => void
}

const OrderPage: FC<PropsType> = ({ orders, handleDeleteOrder }) => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  const currentOrder: OrderType | undefined = orders.find(order => order.id === Number(orderId));

  const [buttonCounter, setButtonCounter] = useState<number>(0);

  const handleButtonClick = () => {
    if (buttonCounter === 0) {
      setButtonCounter(buttonCounter + 1);
    } else if (buttonCounter === 1) {
      setButtonCounter(0);
      handleDeleteOrder(Number(orderId));
      navigate('/orders');
    }
  }

  return (
    <div className="order-page">
      <button onClick={handleButtonClick} className={`order-page__delButton ${buttonCounter === 1 ? 'order-page__delButton_type_warning' : ''}`} aria-label='Кнопка удаления заказа'>Удалить</button>
      <p className="order-page__text">Город/Улица: <span className="order-page__span">{currentOrder?.city}{currentOrder?.street}</span></p>
      <p className="order-page__text">Дом/квартира: <span className="order-page__span">{`д.${currentOrder?.houseNumber}, кв.${currentOrder?.apartmentNumber}`}</span></p>
      <p className="order-page__text">Заказчик: <span className="order-page__span">{currentOrder?.customer}</span></p>
      <p className="order-page__text">Номер телефона: <a href={`tel: ${currentOrder?.customerTel}`} className="order-page__link page__link">{currentOrder?.customerTel}</a></p>
      <h2 className="order-page__title">Помещения и услуги:</h2>
      <button className="order-page__addRoomButton" aria-label='Кнопка добавления помещения'>Добавить помещение</button>
      <ul className="rooms page__list">
        <li className="room">
          <h2 className="room__title">Кухня</h2>
          <p className="room__info">Площадь стен:<span className="room__span">40 кв./м.</span></p>
          <p className="room__info">Площадь потолка:<span className="room__span">70 кв./м.</span></p>
          <p className="room__info">Площадь пола:<span className="room__span">70 кв./м.</span></p>
          <h3 className="room__subtitle">Услуги:</h3>
          <label htmlFor="roomServices" className="room__label">
            <button className='room__delButton'><span className="room__buttonSpan">x</span></button>
            <select name="roomServices" className="room__services">
              <option value="Услуга один" className="room__service">Услуга один</option>
              <option value="Услуга два" className="room__service">Услуга два</option>
              <option value="Услуга три" className="room__service">Услуга три</option>
              <option value="Услуга четыре" className="room__service">Услуга четыре</option>
            </select>
          </label>
        </li>
      </ul>
    </div>
  )
}

export default OrderPage;