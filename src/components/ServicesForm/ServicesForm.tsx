import { ChangeEvent, FC } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { Link, useNavigate } from 'react-router-dom';

export type ServiceType = {
  name: string
  price: number
  dependence: string
}

type PropsType = {
  handleServicesFormSubmit: (params: ServiceType) => void
}

const ServicesForm: FC<PropsType> = ({ handleServicesFormSubmit }) => {

  const navigate = useNavigate();

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const serviceObj = {} as ServiceType;
    const name: string = values.serviceName;
    const price: number = Number(values.servicePrice);
    const dependence: string = values.dependence;
    serviceObj.name = name;
    serviceObj.price = price;
    serviceObj.dependence = dependence;
    handleServicesFormSubmit(serviceObj);
    resetForm();
    navigate('/rcounter/services');
  }

  return (
    <Form handleSubmit={handleSubmit} formName='services' formTitle='Введите название услуги и цену:'>
      <FormInput required={true} onChange={handleChange} value={values.serviceName} name='serviceName' type="text" label='Название услуги:' error={errors.serviceName} />
      <FormInput required={true} onChange={handleChange} value={values.servicePrice} name='servicePrice' type="number" label='Стоимость услуги за ед.:' error={errors.servicePrice} />
      <label className='services__label'>
        Расчет из:
        <select name="dependence" className='services__select' onChange={handleChange} value={values.dependence} required>
          <option value=''>От чего зависит</option>
          <option value="wallS">Площадь стен</option>
          <option value="ceilingS">Площадь потолка</option>
          <option value="floorS">Площадь пола</option>
          <option value="ceilingP">Периметр потолка</option>
          <option value="floorP">Периметр пола</option>
        </select>
      </label>
      <FormButton isFormValid={isFormValid} name='services-button' buttonText='Сохранить услугу' />
      <Link to='/rcounter/services' className='services__link page__link'>К списку услуг</Link>
    </Form>
  )
}

export default ServicesForm;