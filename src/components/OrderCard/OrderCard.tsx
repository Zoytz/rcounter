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

  const customerTel = String(order.customerTel);

  return (
    <li key={order.id} className="order">
      <Link className="order__link page__link" to={`/orders/${order.id}`}>
        <h2 className="order__title">{order.city}, {order.street ? `ул. ${order.street}, ` : ''}</h2>
        <h2 className="order__title">{order.houseNumber ? `дом ${order.houseNumber}, ` : ''} {order.apartmentNumber ? `кв. ${order.apartmentNumber}` : ''}</h2>
        <h3 className="order__subtitle">{order.customer}:  
        <a className="order__subtitle-link page__link" href={`tel: ${order.customerTel}`}>{customerTel.length === 11 ? `${customerTel[0]}(${customerTel.slice(0, 3)})${customerTel.slice(3, 6)}-${customerTel.slice(6, 8)}-${customerTel.slice(8, 10)}` : order.customerTel}</a>
        </h3>
      </Link>
    </li>
  )
}

export default OrderCard;