import { FC } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import { OrderType } from '../OrdersForm/OrdersForm';

type PropsType = {
  orders: Array<OrderType>
}

const OrdersList: FC<PropsType> = ({ orders }) => {
  return (
    <>
      <ul className='orders page__list'>
        {
          [...orders].reverse().map((order: OrderType) => {
            return (
              <OrderCard key={order.id} order={order} />
            )
          })
        }
      </ul>
      <Link to='/rcounter/add-orders' className="orders__link page__link">+</Link>
    </>
  )
}

export default OrdersList;