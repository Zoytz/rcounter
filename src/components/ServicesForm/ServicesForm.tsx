import React, { ChangeEvent, FC } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { Link, useNavigate } from 'react-router-dom';

export type ServiceType = {
  name: string | null
  price: number | null
}

type PropsType = {
  handleServicesFormSubmit: (params: ServiceType) => void
}

const ServicesForm: FC<PropsType> = ({ handleServicesFormSubmit }) => {

  const navigate = useNavigate();

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const serviceObj: ServiceType = { name: null, price: null };
    const name: string = values.serviceName;
    const price: number = Number(values.servicePrice);
    serviceObj.name = name;
    serviceObj.price = price;
    handleServicesFormSubmit(serviceObj);
    resetForm();
    navigate('/services');
  }

  return (
    <Form handleSubmit={handleSubmit} formName='services' formTitle='Введите название услуги и цену:'>
      <FormInput required={true} onChange={handleChange} value={values.serviceName} name='serviceName' type="text" label='Название услуги:' error={errors.serviceName} />
      <FormInput required={true} onChange={handleChange} value={values.servicePrice} name='servicePrice' type="number" label='Стоимость услуги за ед.:' error={errors.servicePrice} />
      <FormButton isFormValid={isFormValid} name='services-button' buttonText='Сохранить услугу' />
      <Link to='/services' className='services__link page__link'>К списку услуг</Link>
    </Form>
  )
}

export default ServicesForm;