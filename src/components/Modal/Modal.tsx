import { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
const modalRootElement = document.querySelector('#modal');


const Modal = (props: any) => {

  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    modalRootElement?.appendChild(element);
    return () => {
      modalRootElement?.removeChild(element);
    }
  })

  return createPortal(
    <div className="menu__container">
      <nav className="menu">
        <button className="menu__button" type='button' aria-label='Кнопка закрытия меню'>
          
        </button>
        <ul className="menu__items page__list">
          <li className="menu__item">
            <Link to="/orders" className='menu__link page__link'>Заказы</Link>
          </li>
          <li className="menu__item">
            <Link to="/services" className='menu__link page__link'>Услуги</Link>
          </li>
          <li className="menu__item">
            <Link to="/add-orders" className='menu__link page__link'>Создать заказ</Link>
          </li>
          <li className="menu__item">
            <Link to="/add-services" className='menu__link page__link'>Создать услугу</Link>
          </li>
        </ul>
      </nav>
    </div>
    , element);
}

export default Modal;