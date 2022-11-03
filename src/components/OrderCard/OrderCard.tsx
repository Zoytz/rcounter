import React, { FC, ReactNode, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { OrderType } from '../OrdersForm/OrdersForm';

type PropsType = {
  order: OrderType
}

const OrderCard: FC<PropsType> = ({ order }) => {

  const customerTel = String(order.customerTel);

  return (
    <li key={order.id} className="order">
      <h2 className="order__title">{order.city}, {order.street ? `ул. ${order.street}, ` : ''}</h2>
      <h2 className="order__title">{order.houseNumber ? `дом ${order.houseNumber}, ` : ''} {order.apartmentNumber ? `кв. ${order.apartmentNumber}` : ''}</h2>
      <h3 className="order__subtitle">{order.customer}:
        <a className="order__subtitle-link page__link" href={`tel: ${order.customerTel}`}>{customerTel.length === 11 ? `${customerTel[0]}(${customerTel.slice(1, 4)})${customerTel.slice(4, 7)}-${customerTel.slice(7, 9)}-${customerTel.slice(9, 11)}` : order.customerTel}</a>
      </h3>
      <div className="order__buttons">
        <a href={`tel: ${order.customerTel}`} className="order__button">Позвонить</a>
        <Link className="order__button" to={`/orders/${order.id}`}>Подробнее</ Link>
      </div>
    </li>
  )
}

export default OrderCard;