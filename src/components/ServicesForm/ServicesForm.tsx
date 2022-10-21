import { ChangeEvent, FC }  from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

type PropsType = {
  handleServicesFormSubmit: ( params: Record<string, number> ) => void
}

const ServicesForm: FC<PropsType> = ({ handleServicesFormSubmit }) => {

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  type ServiceObjType = Record< string, number >

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const serviceObj:ServiceObjType = {};
    const name: string = values.serviceName;
    const price: number = Number(values.servicePrice);
    serviceObj[name] = price;
    handleServicesFormSubmit(serviceObj);
    resetForm();
  }

  return (
    <Form handleSubmit={handleSubmit} formName='services' formTitle='Введите название услуги и цену:'>
      <FormInput onChange={handleChange} value={values.serviceName} name='serviceName' type="text" label='Название услуги:' error={errors.serviceName} />
      <FormInput onChange={handleChange} value={values.servicePrice} name='servicePrice' type="number" label='Стоимость услуги за ед.:' error={errors.servicePrice} />
      <FormButton isFormValid={isFormValid} name='services-button' buttonText='Сохранить услугу' />
    </Form> 
  )
}

export default ServicesForm;