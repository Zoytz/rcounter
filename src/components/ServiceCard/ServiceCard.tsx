import { FC } from 'react';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  service: ServiceType
  handleDeleteService: (param: ServiceType) => void
}

const ServiceCard: FC<PropsType> = ({ service, handleDeleteService }) => {

  const handleButtonClick = () => {
    handleDeleteService(service);
  }

  return (
    <li key={`${service.price}${service.name}`} className="service">
      <h2 className="service__title">{service.name}: <span className='service__span'>{service.price} руб.</span></h2>
      <button onClick={handleButtonClick} type="button" className={`service__button`} aria-label="Удалить услугу"></button>
    </li>
  )
}

export default ServiceCard;