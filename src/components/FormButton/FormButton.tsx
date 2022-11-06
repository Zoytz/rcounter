import { FC } from 'react';

type PropsType = {
  name: string
  buttonText: string
  isFormValid: boolean
}

const FormButton: FC<PropsType> = ({ name, buttonText, isFormValid }) => {
  return (
    <button disabled={ !isFormValid } type="submit" className={`form-button form-button_type_${name} ${ isFormValid ? '' : 'form-button_type_disabled'}`} aria-label="Кнопка отправки формы">{ buttonText }</button>
  )
}

export default FormButton;