import { ChangeEvent, FC } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { Link, useNavigate, useParams } from 'react-router-dom';

export type RoomType = {
  roomName: string
  roomWallS: number
  roomFloorS: number
  roomCeilingS: number
  roomFloorP: number
  roomCeilingP: number
  orderId: number
  id: number
  roomDoorsCount: string
  roomWindowsCount?: string,
  roomWallOne: string,
  roomWallTwo: string,
  roomWallHeight: string,
}

type PropsType = {
  handleAddRooms: (param: RoomType) => void
}

const RoomForm: FC<PropsType> = ({ handleAddRooms }) => {

  const { orderId } = useParams();

  const navigate = useNavigate();

  const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    handleAddRooms({
      roomName: values.roomName,
      roomWallS: (((Number(values.roomWallOne) * Number(values.roomWallHeight) * 2) + (Number(values.roomWallTwo) * Number(values.roomWallHeight) * 2)) - (Number(values.roomWindowsCount) * 2.5) - (Number(values.roomDoorsCount) * 1.6)),
      roomFloorS: (Number(values.roomWallOne) * Number(values.roomWallTwo)),
      roomCeilingS: (Number(values.roomWallOne) * Number(values.roomWallTwo)),
      roomFloorP: ((Number(values.roomWallOne) + Number(values.roomWallTwo)) * 2),
      roomCeilingP: ((Number(values.roomWallOne) + Number(values.roomWallTwo)) * 2),
      roomDoorsCount: values.roomDoorsCount,
      roomWindowsCount: values.roomWindowsCount,
      roomWallOne: values.roomWallOne,
      roomWallTwo: values.roomWallTwo,
      roomWallHeight: values.roomWallHeight,
      orderId: Number(orderId),
      id: Date.now(),
    });
    resetForm();
    navigate(`/rcounter/orders/${orderId}`);
  }

  return (
    <Form handleSubmit={handleSubmit} formName='rooms' formTitle='Параметры помещения:'>
      <FormInput required={true} onChange={handleChange} value={values.roomName} name='roomName' type="text" label='Название помещения:' error={errors.serviceName} />
      <FormInput required={true} onChange={handleChange} value={values.roomWallOne} name='roomWallOne' type="number" label='Длина первой стены:' error={errors.servicePrice} />
      <FormInput required={true} onChange={handleChange} value={values.roomWallTwo} name='roomWallTwo' type="number" label='Длина второй стены:' error={errors.servicePrice} />
      <FormInput required={true} onChange={handleChange} value={values.roomWallHeight} name='roomWallHeight' type="number" label='Высота стен:' error={errors.servicePrice} />
      <FormInput required={false} onChange={handleChange} value={values.roomWindowsCount} name='roomWindowsCount' type="number" label='Количество окон:' error={errors.servicePrice} />
      <FormInput required={true} onChange={handleChange} value={values.roomDoorsCount} name='roomDoorsCount' type="number" label='Количество дверей:' error={errors.servicePrice} />
      <FormButton isFormValid={isFormValid} name='services-button' buttonText='Сохранить помещение' />
      <Link to={`/rcounter/orders/${orderId}`} className='services__link page__link'>Вернуться к заказу</Link>
    </Form>
  )
}

export default RoomForm;