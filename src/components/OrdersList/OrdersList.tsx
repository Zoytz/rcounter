import { FC } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';
import { OrderType } from '../OrdersForm/OrdersForm';
import { RoomServiceType } from '../RoomCard/RoomCard';

type PropsType = {
  orders: Array<OrderType>
  roomsServices: RoomServiceType[]
}

const OrdersList: FC<PropsType> = ({ orders,  roomsServices}) => {
  return (
    <>
      <Link to='/add-orders' className="orders__link page__link">Создать заказ</Link>
      <ul className='orders page__list'>
        {
          [...orders].reverse().map((order: OrderType) => {
            const orderCash = roomsServices.filter((roomService) => roomService.orderId === Number(order.id)).reduce((prev, item) => prev + item.cash, 0);
            return (
              <OrderCard key={order.id} order={order} orderCash={orderCash} />
            )
          })
        }
      </ul>
    </>
  )
}

export default OrdersList;