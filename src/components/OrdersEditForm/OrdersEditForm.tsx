import { ChangeEvent, FC, useEffect } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderType } from '../OrdersForm/OrdersForm';

type PropsType = {
  handleEditOrder: (param: OrderType) => void
}

const OrdersEditForm: FC<PropsType> = ({ handleEditOrder }) => {

  const { orderId } = useParams();

  const ordersFromLS = JSON.parse(localStorage.getItem('orders')!) as OrderType[];

  const currentOrder = ordersFromLS.find((order: OrderType) => order.id === Number(orderId));

  const navigate = useNavigate();

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm(currentOrder);
  }, []);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const orderObj =
    {
      city: values.city,
      street: values.street,
      houseNumber: Number(values.houseNumber),
      apartmentNumber: Number(values.apartmentNumber),
      customer: values.customer,
      customerTel: Number(values.customerTel),
      id: Number(orderId),
    }

    handleEditOrder(orderObj);
    resetForm();
    navigate(`/orders/${orderId}`);
  }

  return (
    <Form handleSubmit={handleSubmit} formName='orders' formTitle='Заполните поля формы:'>
      <FormInput required={true} onChange={handleChange} value={values.city} name='city' type="text" label='Населенный пункт:' error={errors.city} />
      <FormInput required={false} onChange={handleChange} value={values.street} name='street' type="text" label='Улица:' error={errors.street} />
      <FormInput required={true} onChange={handleChange} value={values.houseNumber} name='houseNumber' type="number" label='Дом:' error={errors.houseNumber} />
      <FormInput required={false} onChange={handleChange} value={values.apartmentNumber} name='apartmentNumber' type="number" label='Квартира:' error={errors.apartmentNumber} />
      <FormInput required={true} onChange={handleChange} value={values.customer} name='customer' type="text" label='Имя заказчика:' error={errors.customer} />
      <FormInput required={true} onChange={handleChange} value={values.customerTel} name='customerTel' type="number" label='Тел. заказчика:' error={errors.customerTel} />
      <FormButton isFormValid={isFormValid} name='orders-button' buttonText='Отредактировать' />
    </Form>
  )
}

export default OrdersEditForm;