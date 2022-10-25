import React, { FC, ReactNode, ChangeEvent } from 'react';
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
              <ServiceCard handleDeleteService={handleDeleteService} service={service} />
            )
          })
        }
      </ul>
      <Link to='/add-services' className="services__button page__link">+</Link>
    </>
  )
}

export default ServicesList;