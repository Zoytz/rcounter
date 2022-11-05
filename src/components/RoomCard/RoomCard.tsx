import { FC, useState, ChangeEvent } from 'react';
import { RoomType } from '../RoomForm/RoomForm';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  currentRoom: RoomType
  services: Array<ServiceType>
  handleDeleteRoom: (param: number) => void
}

const RoomCard: FC<PropsType> = ({ currentRoom, handleDeleteRoom, services }) => {

  const [buttonCounter, setButtonCounter] = useState<number>(0);

  const cashCounter = (selectedValue: string): void => {
    const userService = services.find((service) => service.name === selectedValue);
    console.log(userService)
  }

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;
    const selectValue = select.value;
    const selectObj = {};
    cashCounter(selectValue);
    

    console.log(select, selectValue)
  }

  const handleButtonClick = () => {
    if (buttonCounter === 0) {
      setButtonCounter(buttonCounter + 1);
    } else if (buttonCounter === 1) {
      setButtonCounter(0);
      handleDeleteRoom(currentRoom.id);
    }
  }

  return (
    <li className="room" >
      <div className="room__header">
        <button onClick={handleButtonClick} className={`room__delButton ${buttonCounter === 1 ? 'room__delButton_type_warning' : ''}`}>Удалить</button>
        <h2 className="room__title">{currentRoom.roomName}</h2>
      </div>
      <p className="room__info">Площадь стен:<span className="room__span">
        {currentRoom.roomWallS.toFixed(2)} кв./м.</span></p>
      <p className="room__info">Площадь потолка/пола:<span className="room__span">{currentRoom.roomCeilingS.toFixed(2)} кв./м.</span></p>
      <h3 className="room__subtitle">Услуги:</h3>
      <label htmlFor="roomServices" className="room__label">
        {/* <button className='room__servicesDelButton'><span className="room__buttonSpan">x</span></button> */}
        <select onChange={handleSelect} name="roomServices" className="room__services">
        <option value="Выберете услугу:" className="room__service">Услуга:</option>
          {
            services.map((service) => {
              return <option value={`${service.name}`} className="room__service">{service.name}</option>
            })
          }
        </select>
      </label>
    </li>
  )
}

export default RoomCard;