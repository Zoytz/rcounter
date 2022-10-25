import React, { FC, ReactNode, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { OrderType } from '../OrdersForm/OrdersForm';

type PropsType = {
  order: OrderType
  handleDeleteOrder: (param: OrderType) => void
}

const OrderCard: FC<PropsType> = ({ order, handleDeleteOrder }) => {

  const handleButtonClick = () => {
    handleDeleteOrder(order);
  }

  return (
    <li key={`${order.customerTel}${order.street}`} className="order">
      <h2 className="order__title">{order.city}, {order.street ? `ул. ${order.street}, ` : ''} {order.houseNumber ? `дом ${order.houseNumber}, ` : ''} {order.apartmentNumber ? `кв. ${order.apartmentNumber}` : ''}</h2>
      <h3 className="order__subtitle">{order.customer}: {order.customerTel}</h3>
      <div className="order__buttons">
        <button onClick={handleButtonClick} type="button" className="order__button" aria-label='Кнопка удаления заказа'>Удалить</button>
        <button onClick={handleButtonClick} type="button" className="order__button" aria-label='Посмотреть заказ подробнее'>Подробнее</button>
      </div>
    </li>
  )
}

export default OrderCard;