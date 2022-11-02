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
      <button onClick={handleButtonClick} className={`order-page__delButton ${buttonCounter === 1 ? 'order-page__delButton_type_warning' : ''}`}>Удалить</button>
      <p className="order-page__text">Город/Улица: <span className="order-page__span">{currentOrder?.city}{currentOrder?.street}</span></p>
      <p className="order-page__text">Дом/квартира: <span className="order-page__span">{`д.${currentOrder?.houseNumber}, кв.${currentOrder?.apartmentNumber}`}</span></p>
      <p className="order-page__text">Заказчик: <span className="order-page__span">{currentOrder?.customer}</span></p>
      <p className="order-page__text">Номер телефона: <a href={`tel: ${currentOrder?.customerTel}`} className="order-page__link page__link">{currentOrder?.customerTel}</a></p>
      <h2 className="order-page__title">Помещения и услуги:</h2>
      <button className="order-page__addRoomButton">Добавить помещение</button>
      <ul className="order-page__rooms page__list">
        <li className="order-page__room">

        </li>
      </ul>
    </div>
  )
}

export default OrderPage;