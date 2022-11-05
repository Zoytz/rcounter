import { FC, useState, ChangeEvent } from 'react';
import { RoomType } from '../RoomForm/RoomForm';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  currentRoom: RoomType
  services: Array<ServiceType>
  roomsServices: Array<RoomServiceType>
  handleDeleteRoom: (param: number) => void
  handleAddRoomService: (param: RoomServiceType) => void
}

export type RoomServiceType = {
  id: number
  roomId: number
  cash: number
  value: string
}

const RoomCard: FC<PropsType> = ({ currentRoom, handleDeleteRoom, services, handleAddRoomService, roomsServices }) => {

  const [buttonCounter, setButtonCounter] = useState<number>(0);

  const servicesOfThisRoom = roomsServices.filter((roomsService) => roomsService.roomId === currentRoom.id);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;
    const selectValue = select.value;
    const selectObj = {} as RoomServiceType;
    const userService = services.find((service) => service.name === selectValue) as ServiceType;

    let serviceCash = 0;

    switch (userService.dependence) {
      case 'wallS':
        serviceCash = currentRoom.roomWallS * userService.price;
        break;
      case 'ceilingS':
        serviceCash = currentRoom.roomCeilingS * userService.price;
        break;
      case 'floorS':
        serviceCash = currentRoom.roomFloorS * userService.price;
        break;
      case 'ceilingP':
        serviceCash = currentRoom.roomCeilingP * userService.price;
        break;
      case 'floorP':
        serviceCash = currentRoom.roomFloorP * userService.price;
        break;
      default:
        alert('Нужно запомнить, что Вы сделали до появления этого окна и рассказать об этом разработчику')
    }

    selectObj.roomId = currentRoom.id;
    selectObj.cash = serviceCash;
    selectObj.value = selectValue;

    handleAddRoomService(selectObj);
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

      {
        servicesOfThisRoom ? servicesOfThisRoom.map((serviceOfThisRoom) => {
          serviceOfThisRoom.id = Date.now();
          return (
            <label htmlFor="roomServices" className="room__label">
              <button className='room__servicesDelButton'><span className="room__buttonSpan">x</span></button>
              <select onChange={handleSelect} name="roomServices" className="room__services">
                <option value={serviceOfThisRoom.value} className="room__service">{serviceOfThisRoom.value}</option>
                {
                  services.map((service) => {
                    return <option key={service.name} value={`${service.name}`} className="room__service">{service.name}</option>
                  })
                }
              </select>
            </label>
          )
        }) : null
        
      }

      <label htmlFor="roomServices" className="room__label">
        {/* <button className='room__servicesDelButton'><span className="room__buttonSpan">x</span></button> */}
        <select onChange={handleSelect} name="roomServices" className="room__services">
          <option value="Выберете услугу:" className="room__service">Услуга:</option>
          {
            services.map((service) => {
              return <option key={service.name} value={`${service.name}`} className="room__service">{service.name}</option>
            })
          }
        </select>
      </label>
    </li>
  )
}

export default RoomCard;