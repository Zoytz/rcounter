import { FC, useState } from 'react';
import { RoomType } from '../RoomForm/RoomForm';

type PropsType = {
  currentRoom: RoomType
}

const RoomCard:FC<PropsType> = ({currentRoom}) => {

  const [buttonCounter, setButtonCounter] = useState<number>(0);

  const handleButtonClick = () => {
    if (buttonCounter === 0) {
      setButtonCounter(buttonCounter + 1);
    } else if (buttonCounter === 1) {
      setButtonCounter(0);
    }
  }

  return (
    <li className="room" >
      <div className="room__header">
        <button onClick={handleButtonClick} className={`room__delButton ${buttonCounter === 1 ? 'room__delButton_type_warning' : ''}`}>Удалить</button>
        <h2 className="room__title">{currentRoom.roomName}</h2>
      </div>
      <p className="room__info">Площадь стен:<span className="room__span">
        {currentRoom.roomWallS} кв./м.</span></p>
      <p className="room__info">Площадь потолка/пола:<span className="room__span">{currentRoom.roomCeilingS} кв./м.</span></p>
      <h3 className="room__subtitle">Услуги:</h3>
      <label htmlFor="roomServices" className="room__label">
        <button className='room__servicesDelButton'><span className="room__buttonSpan">x</span></button>
        <select name="roomServices" className="room__services">
          <option value="Услуга один" className="room__service">Услуга один</option>
          <option value="Услуга два" className="room__service">Услуга два</option>
          <option value="Услуга три" className="room__service">Услуга три</option>
          <option value="Услуга четыре" className="room__service">Услуга четыре</option>
        </select>
      </label>
    </li>
  )
}

export default RoomCard;