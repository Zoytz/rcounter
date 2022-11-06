import { FC, useState } from 'react';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  service: ServiceType
  handleDeleteService: (param: ServiceType) => void
}

const ServiceCard: FC<PropsType> = ({ service, handleDeleteService }) => {

  const [buttonCounter, setButtonCounter] = useState<number>(0);
  
  const handleButtonClick = () => {
    if (buttonCounter === 0) {
      setButtonCounter(buttonCounter + 1);
    } else if(buttonCounter === 1) {
      setButtonCounter(0);
      handleDeleteService(service);
    } 
  }

  return (
    <li key={`${service.price}${service.name}`} className="service">
      <h2 className="service__title">{service.name}: <span className='service__span'>{service.price} руб.</span></h2>
      <button onClick={handleButtonClick} type="button" className={`${buttonCounter === 1 ?'service__button_type_warning' : ''} service__button`} aria-label="Удалить услугу">Удалить</button>
    </li>
  )
}

export default ServiceCard;