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
  roomDoorsCount: number
  roomWindowsCount: number,
  roomWallOne: number,
  roomWallTwo: number,
  roomWallHeight: number,
  roomWindowH?: number,
  roomWindowW?: number,
  roomDoorW: number,
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

    const roomObj = {
      roomName: values.roomName,
      roomWallS: (((Number(values.roomWallOne) * Number(values.roomWallHeight) * 2) + (Number(values.roomWallTwo) * Number(values.roomWallHeight) * 2)) - (Number(values.roomWindowsCount) * (Number(values.roomWindowH) * Number(values.roomWindowW))) - (Number(values.roomDoorsCount) * (2 * Number(values.roomDoorW)))),
      roomFloorS: (Number(values.roomWallOne) * Number(values.roomWallTwo)),
      roomCeilingS: (Number(values.roomWallOne) * Number(values.roomWallTwo)),
      roomFloorP: ((Number(values.roomWallOne) + Number(values.roomWallTwo)) * 2),
      roomCeilingP: ((Number(values.roomWallOne) + Number(values.roomWallTwo)) * 2),
      roomDoorsCount: Number(values.roomDoorsCount),
      roomWindowsCount: Number(values.roomWindowsCount),
      roomWallOne: Number(values.roomWallOne),
      roomWallTwo: Number(values.roomWallTwo),
      roomWallHeight: Number(values.roomWallHeight),
      roomWindowH: Number(values.roomWindowH),
      roomWindowW: Number(values.roomWindowW),
      roomDoorW: Number(values.roomDoorW),
      orderId: Number(orderId),
      id: Date.now(),
    }

    if (Number(values.roomWindowsCount) === 0) {
      handleAddRooms({...roomObj, 
        roomWindowH: 0,
        roomWindowW: 0,
      })
    } else {
      handleAddRooms(roomObj);
    }

    // handleAddRooms({
    //   roomName: values.roomName,
    //   roomWallS: (((Number(values.roomWallOne) * Number(values.roomWallHeight) * 2) + (Number(values.roomWallTwo) * Number(values.roomWallHeight) * 2)) - (Number(values.roomWindowsCount) * (Number(values.roomWindowH) * Number(values.roomWindowW))) - (Number(values.roomDoorsCount) * (2 * Number(values.roomDoorW)))),
    //   roomFloorS: (Number(values.roomWallOne) * Number(values.roomWallTwo)),
    //   roomCeilingS: (Number(values.roomWallOne) * Number(values.roomWallTwo)),
    //   roomFloorP: ((Number(values.roomWallOne) + Number(values.roomWallTwo)) * 2),
    //   roomCeilingP: ((Number(values.roomWallOne) + Number(values.roomWallTwo)) * 2),
    //   roomDoorsCount: Number(values.roomDoorsCount),
    //   roomWindowsCount: Number(values.roomWindowsCount),
    //   roomWallOne: Number(values.roomWallOne),
    //   roomWallTwo: Number(values.roomWallTwo),
    //   roomWallHeight: Number(values.roomWallHeight),
    //   roomWindowH: Number(values.roomWindowH || 0),
    //   roomWindowW: Number(values.roomWindowW || 0),
    //   roomDoorW: Number(values.roomDoorW),
    //   orderId: Number(orderId),
    //   id: Date.now(),
    // });
    resetForm();
    navigate(`/orders/${orderId}`);
  }

  return (
    <Form handleSubmit={handleSubmit} formName='rooms' formTitle='Параметры помещения:'>
      <FormInput required={true} onChange={handleChange} value={values.roomName} name='roomName' type="text" label='Название помещения:' error={errors.roomName} />
      <FormInput required={true} onChange={handleChange} value={values.roomWallOne} name='roomWallOne' type="number" label='Длина первой стены:' error={errors.roomWallOne} />
      <FormInput required={true} onChange={handleChange} value={values.roomWallTwo} name='roomWallTwo' type="number" label='Длина второй стены:' error={errors.roomWallTwo} />
      <FormInput required={true} onChange={handleChange} value={values.roomWallHeight} name='roomWallHeight' type="number" label='Высота стен:' error={errors.roomWallHeight} />
      <FormInput required={false} onChange={handleChange} value={values.roomWindowsCount} name='roomWindowsCount' type="number" label='Количество окон:' error={errors.roomWindowsCount} />
      {Number(values.roomWindowsCount) > 0 ?
        <>
          <FormInput required={true} onChange={handleChange} value={values.roomWindowH} name='roomWindowH' type="number" label='Высота окна:' error={errors.roomWindowH}/>
          <FormInput required={true} onChange={handleChange} value={values.roomWindowW} name='roomWindowW' type="number" label='Ширина Окна:' error={errors.roomWindowW}/>
        </>
        : null
      }
      <FormInput required={true} onChange={handleChange} value={values.roomDoorsCount} name='roomDoorsCount' type="number" label='Количество дверей:' error={errors.roomDoorsCount} />
      <FormInput required={true} onChange={handleChange} value={values.roomDoorW} name='roomDoorW' type="number" label='Ширина двери:' error={errors.roomDoorW} />
      <FormButton isFormValid={isFormValid} name='services-button' buttonText='Сохранить помещение' />
      <Link to={`/orders/${orderId}`} className='services__link page__link'>Вернуться к заказу</Link>
    </Form>
  )
}

export default RoomForm;