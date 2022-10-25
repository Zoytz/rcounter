import { ChangeEvent, FC }  from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useNavigate } from 'react-router-dom';

export type OrderType = {
  city?: string
  street?: string
  houseNumber?: number
  apartmentNumber?: number
  customer?: string
  customerTel?: number
  id?: number
}

type PropsType = {
  handleOrdersFormSubmit: (params: OrderType) => void
}

const OrdersForm: FC<PropsType> = ({ handleOrdersFormSubmit }) => {

  const navigate = useNavigate();

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const date = Date.now();
    const orderObj: OrderType = {};
    orderObj.city = values.city;
    orderObj.street = values.street;
    orderObj.houseNumber = Number(values.houseNumber);
    orderObj.apartmentNumber = Number(values.apartmentNumber);
    orderObj.customer = values.customer;
    orderObj.customerTel = Number(values.customerTel);
    orderObj.id = date;
    handleOrdersFormSubmit(orderObj);
    resetForm();
    navigate('/');
  }

  return (
    <Form handleSubmit={handleSubmit} formName='orders' formTitle='Заполните поля формы:'>
      <FormInput required={true} onChange={handleChange} value={values.city} name='city' type="text" label='Населенный пункт:' error={errors.city} />
      <FormInput required={false} onChange={handleChange} value={values.street} name='street' type="text" label='Улица:' error={errors.street} />
      <FormInput required={true} onChange={handleChange} value={values.houseNumber} name='houseNumber' type="number" label='Дом:' error={errors.houseNumber} />
      <FormInput required={false} onChange={handleChange} value={values.apartmentNumber} name='apartmentNumber' type="number" label='Квартира:' error={errors.apartmentNumber} />
      <FormInput required={true} onChange={handleChange} value={values.customer} name='customer' type="text" label='Имя заказчика:' error={errors.customer} />
      <FormInput required={true} onChange={handleChange} value={values.customerTel} name='customerTel' type="number" label='Тел. заказчика:' error={errors.customerTel} />
      <FormButton isFormValid={isFormValid} name='orders-button' buttonText='Создать заказ' />
    </Form> 
  )
}

export default OrdersForm;