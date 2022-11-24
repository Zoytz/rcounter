import { ChangeEvent, FC, useEffect } from 'react';
import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import FormButton from '../FormButton/FormButton';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RoomType } from '../RoomForm/RoomForm';

type PropsType = {
  handleEditRoom: (param: RoomType) => void
}

const RoomEditForm: FC<PropsType> = ({ handleEditRoom }) => {

  const { roomId } = useParams();

  const roomsFromLS = JSON.parse(localStorage.getItem("rooms")!) as RoomType[];

  const currentRoom = roomsFromLS.find((room) => room.id === Number(roomId)) as RoomType;

  const navigate = useNavigate();

  const { values, handleChange, isFormValid, resetForm, errors } = useFormWithValidation();

  useEffect(() => {
    const defaultValuesObj = {
      roomName: currentRoom.roomName,
      roomDoorsCount: currentRoom.roomDoorsCount,
      roomWindowsCount: currentRoom.roomWindowsCount,
      roomWallOne: currentRoom.roomWallOne,
      roomWallTwo: currentRoom.roomWallTwo,
      roomWallHeight: currentRoom.roomWallHeight,
      roomDoorW: currentRoom.roomDoorW,
      roomWindowH: currentRoom.roomWindowH || 0,
      roomWindowW: currentRoom.roomWindowW || 0,
    }
    resetForm(defaultValuesObj);
  }, []);

  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const updatedRoom = {
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
      orderId: Number(currentRoom.orderId),
      id: currentRoom.id
    }
    if (Number(values.roomWindowsCount) === 0) {
      handleEditRoom({...updatedRoom,
        roomWindowH: 0,
        roomWindowW: 0,
      });
    } else {
      handleEditRoom(updatedRoom);
    }
    resetForm();
    navigate(`/orders/${currentRoom?.orderId}`);
  }

  return (
    <Form handleSubmit={handleSubmit} formName='rooms' formTitle='Параметры помещения:'>
      <FormInput required={true} onChange={handleChange} value={values.roomName} name='roomName' type="text" label='Название помещения:' error={errors.roomName}/>
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
      <FormInput required={true} onChange={handleChange} value={values.roomDoorsCount} name='roomDoorsCount' type="number" label='Количество дверей:' error={errors.roomDoorsCount}/>
      <FormInput required={true} onChange={handleChange} value={values.roomDoorW} name='roomDoorW' type="number" label='Ширина двери:' error={errors.roomDoorW}/>
      <FormButton isFormValid={isFormValid} name='services-button' buttonText='Сохранить помещение' />
      <Link to={`/orders/${currentRoom?.orderId}`} className='services__link page__link'>Вернуться к заказу</Link>
    </Form>
  )
}

export default RoomEditForm;