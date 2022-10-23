import React, { FC, ReactNode, ChangeEvent } from 'react';



const ServicesList: FC<any> = ({services}) => {
  return (
    <ul className='services page__list'>
      {
        services.map((service:Record<string, number>) => {
          let serviceKey = Object.keys(service);
          return (
            <li key={serviceKey[0]} className="service">
              <h2 className="service__title">{serviceKey[0]}: {service[serviceKey[0]]} руб./кв.м.</h2>
              <button className="service__button">Удалить</button>
            </li>
          )
        })
      }

    </ul>
  )
}

export default ServicesList;