import React from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

const ServicesForm = () => {

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  return (
    <Form formName='services' formTitle='Введите название услуги и цену:'>
      <FormInput onChange={handleChange} value={values.serviceName} name='serviceName' type="number" label='Название услуги:' error={errors.serviceName} />
      <FormInput onChange={handleChange} value={values.servicePrice} name='servicePrice' type="text" label='Стоимость услуги за ед.:' error={errors.servicePrice} />
      <FormButton name='services-button' buttonText='Сохранить услугу' />
    </Form> 
  )
}

export default ServicesForm;