import { FC } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../ServiceCard/ServiceCard';
import { ServiceType } from '../ServicesForm/ServicesForm';

type PropsType = {
  services: Array<ServiceType>
  handleDeleteService: (param: ServiceType) => void
}

const ServicesList: FC<PropsType> = ({ services, handleDeleteService }) => {
  return (
    <>
      <ul className='services page__list'>
        {
          services.map((service: ServiceType) => {
            return (
              <ServiceCard key={`${service.name}${service.price}`} handleDeleteService={handleDeleteService} service={service} />
            )
          })
        }
      </ul>
      <Link to='/rcounter/orders' className="services__navLink page__link">К заказам</Link>
      <Link to='/rcounter/add-services' className="services__button page__link">+</Link>
    </>
  )
}

export default ServicesList;