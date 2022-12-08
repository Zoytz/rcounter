import { useMemo, useEffect, FC, useState } from 'react';
import { createPortal } from 'react-dom';
const modalRootElement = document.querySelector('#congrats');

type PropsType = {
  isCongratsOpen: boolean
  handleCloseCongrats: () => void
}

const Congrats: FC<PropsType> = ({ isCongratsOpen, handleCloseCongrats }) => {

  // const handleClearLocalStorage = () => {
  //   localStorage.setItem("rooms", JSON.stringify([]));
  //   localStorage.setItem("orders", JSON.stringify([]));
  //   localStorage.setItem("roomsServices", JSON.stringify([]));
  // }

  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (isCongratsOpen) {
      modalRootElement?.appendChild(element);
      return () => {
        modalRootElement?.removeChild(element);
      }
    }
  })


  if (isCongratsOpen) {
    return createPortal(
      <div className="congrats__container">
        <div className="congrats__main">
          <h1 className={`congrats__title`}>Катюня!</h1>
          <h2 className={`congrats__subtitle`}>
            Поздравляю тебя с Днем Рождения!
          </h2>
          <p className="congrats__text">
            Хочу пожелать тебе - всегда оставаться такой яркой, красивой, позитивной!
          </p>
          <p className="congrats__text">
            Ты - невероятно добрый человек. Оставайся такой и пусть тебе встречаются только такие же добрые люди!
          </p>
          <p className="congrats__text">
            И я знаю - ты очень любишь свою работу. Пусть от количества заказов перегревается твой телефон! А чтобы ты не тратила свое драгоценное время на расчеты - существует это приложение.
          </p>
          <h3 className="congrats__subtitle1">
            И еще раз - с Днем Рождения!
          </h3>
          <p className="congrats__text congrats__text_type_ps">
            P.S. С тебя варенье...
          </p>
        </div>
        <button onClick={handleCloseCongrats} className="congrats__button" type="button"></button>
      </div>
      , element);
  } else {
    return null;
  }


}

export default Congrats;