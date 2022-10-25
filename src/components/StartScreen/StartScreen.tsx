import React from 'react';
import { Link } from 'react-router-dom';

function StartScreen() {
  return (
    <div className='start-screen'>
      <h1 className='start-screen__title'>У Вас еще нет заказов</h1>
      <Link to="/add-orders" className="start-screen__link page__link">
        Создать заказ
      </Link>
      <Link to="/services" className="start-screen__link page__link">
        Cписок услуг
      </Link>
    </div>
  )
}

export default StartScreen;