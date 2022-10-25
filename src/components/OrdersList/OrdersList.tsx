import React, { FC, ReactNode, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import { OrderType } from '../OrdersForm/OrdersForm';

type PropsType = {
  orders: Array<OrderType>
  handleDeleteOrder: (params: OrderType) => void
}

const OrdersList: FC<PropsType> = ({ orders, handleDeleteOrder }) => {
  return (
    <>
      <ul className='orders page__list'>
        {
          orders.map((order: OrderType) => {
            return (
              <OrderCard key={order.id} handleDeleteOrder={handleDeleteOrder} order={order} />
            )
          })
        }
      </ul>
      <Link to='/add-orders' className="orders__link page__link">+</Link>
    </>
  )
}

export default OrdersList;