import { useMemo, useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
const modalRootElement = document.querySelector('#modal');

type PropsType = {
  isMenuOpen: boolean
  onClose: () => void
  handleClosePopup: () => void
}

const Modal: FC<PropsType> = ({ isMenuOpen, handleClosePopup }) => {

  // const handleClearLocalStorage = () => {
  //   localStorage.setItem("rooms", JSON.stringify([]));
  //   localStorage.setItem("orders", JSON.stringify([]));
  //   localStorage.setItem("roomsServices", JSON.stringify([]));
  // }

  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (isMenuOpen) {
      modalRootElement?.appendChild(element);
      return () => {
        modalRootElement?.removeChild(element);
      }
    }
  })

  if (isMenuOpen) {
    return createPortal(
      <div className="menu__container">
        <nav className="menu">
          <button onClick={handleClosePopup} className="menu__button" type='button' aria-label='Кнопка закрытия меню'>

          </button>
          <ul className="menu__items page__list">
            <li className="menu__item">
              <Link onClick={handleClosePopup} to="/orders" className='menu__link page__link'>Заказы</Link>
            </li>
            <li className="menu__item">
              <Link onClick={handleClosePopup} to="/services" className='menu__link page__link'>Услуги</Link>
            </li>
            <li className="menu__item">
              <Link onClick={handleClosePopup} to="/add-orders" className='menu__link page__link'>Создать заказ</Link>
            </li>
            <li className="menu__item">
              <Link onClick={handleClosePopup} to="/add-services" className='menu__link page__link'>Создать услугу</Link>
            </li>
          </ul>
          {/* <button onClick={handleClearLocalStorage} className="menu__clear">Очистить все</button> */}
        </nav>
      </div>
      , element);
  } else {
    return null;
  }


}

export default Modal;