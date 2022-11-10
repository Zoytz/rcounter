import { Link } from 'react-router-dom';

function StartScreen() {
  return (
    <div className='start-screen'>
      <p className="start-screen__info">
        Начать использование приложения рекомендуется с заполнения списка услуг.
      </p>
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