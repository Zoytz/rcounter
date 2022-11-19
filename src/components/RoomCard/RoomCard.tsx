import { FC, useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomType } from '../RoomForm/RoomForm';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  currentRoom: RoomType
  services: Array<ServiceType>
  roomsServices: Array<RoomServiceType>
  handleDeleteRoom: (param: number) => void
  handleAddRoomService: (param: RoomServiceType) => void
  handleUpdateRoomServices: (param: RoomServiceType) => void
  handleDeleteRoomServices: (param: number) => void
}

export type RoomServiceType = {
  id: number
  roomId: number
  orderId: number
  cash: number
  value: string
}

const RoomCard: FC<PropsType> = ({ currentRoom, handleDeleteRoom, services, handleAddRoomService, roomsServices, handleUpdateRoomServices, handleDeleteRoomServices }) => {

  const servicesOfThisRoom = roomsServices.filter((roomsService) => roomsService.roomId === currentRoom.id);

  const calculateServiceCash = (serviceOfThisRoom: RoomServiceType) => {
    const userService = services.find((service) => service.name === serviceOfThisRoom.value) as ServiceType;
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

      serviceOfThisRoom.cash = serviceCash;
  }

  useEffect(() => {
    servicesOfThisRoom.forEach((serviceOfThisRoom) => {
      calculateServiceCash(serviceOfThisRoom);
      handleUpdateRoomServices(serviceOfThisRoom);

    })
  }, [ currentRoom.roomCeilingP, currentRoom.roomCeilingS, currentRoom.roomFloorP, currentRoom.roomFloorS, currentRoom.roomWallS ]);

  const [buttonCounter, setButtonCounter] = useState<number>(0);

  const currentCash: number = servicesOfThisRoom.reduce((prevVal: number, item: RoomServiceType): number => prevVal + Number(item.cash), 0);

  const navigate = useNavigate();

  const handleUpdateSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;
    const selectValue = select.value;
    const updatingTheService = servicesOfThisRoom.find((serviceOfThisRoom => serviceOfThisRoom.id === Number(select.getAttribute("id")))) as RoomServiceType;
    updatingTheService.value = selectValue;
    calculateServiceCash(updatingTheService);
    handleUpdateRoomServices(updatingTheService);
  }

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;
    const selectValue = select.value;
    const selectObj = {} as RoomServiceType;

    selectObj.id = Date.now();
    selectObj.roomId = currentRoom.id;
    selectObj.orderId = currentRoom.orderId;
    selectObj.value = selectValue;
    calculateServiceCash(selectObj);

    handleAddRoomService(selectObj);
    navigate(`/orders/${currentRoom.orderId}`)
  }

  const handleDeleteSelect = (event: any) => {
    const button = event.target;
    const delitedServiceId = Number(button.getAttribute("id"));
    handleDeleteRoomServices(delitedServiceId);
  }

  const handleButtonClick = () => {
    if (buttonCounter === 0) {
      setButtonCounter(buttonCounter + 1);
    } else if (buttonCounter === 1) {
      setButtonCounter(0);
      handleDeleteRoom(currentRoom.id);
    }
  }

  const handleEditRoom = () => {
    navigate(`/room-edit/${currentRoom.id}`)
  }

  return (
    <li className="room" >
      <div className="room__header">
        <button onClick={handleButtonClick} className={`room__button ${buttonCounter === 1 ? 'room__button_type_warning' : ''}`}>Удалить</button>
        <button onClick={handleEditRoom} className="room__button">Редактировать</button>
        <h2 className="room__title">{currentRoom.roomName}</h2>
      </div>
      <p className="room__info">Площадь стен:<span className="room__span">
        {currentRoom.roomWallS.toFixed(2)} кв./м.</span></p>
      <p className="room__info">Площадь потолка/пола:<span className="room__span">{currentRoom.roomCeilingS.toFixed(2)} кв./м.</span></p>
      <p className="room__info">Стоимость работ:<span className="room__span">{currentCash.toFixed(0)} руб.</span></p>
      <h3 className="room__subtitle">Услуги:</h3>

      {
        servicesOfThisRoom ? [...servicesOfThisRoom].reverse().map((serviceOfThisRoom) => {
          return (
            <label key={serviceOfThisRoom.id} htmlFor="roomServices" className="room__label">
              <button onClick={handleDeleteSelect} id={`${serviceOfThisRoom.id}`} className='room__servicesDelButton'></button>
              <select id={`${serviceOfThisRoom.id}`} key={serviceOfThisRoom.id} onChange={handleUpdateSelect} name="roomServices" className="room__services">
                <option value={serviceOfThisRoom.value} className="room__service">{serviceOfThisRoom.value}</option>
                {
                  services.map((service) => {
                    return <option key={service.name} value={`${service.name}`} className="room__service">{service.name}</option>
                  })
                }
              </select>
              <p className='room__cash'>{serviceOfThisRoom.cash.toFixed(0)}</p>
            </label>
          )
        }) : null

      }

      <label htmlFor="roomServices" className="room__label">
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