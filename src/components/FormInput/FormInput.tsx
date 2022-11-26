import { FC, ChangeEvent, useState } from 'react';

type PropsType = {
  value?: string
  type: string
  error?: string
  name: string
  label?: string
  required: boolean
  isLabelVisible?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<PropsType> = ({ onChange, value, type, error, name, label, required, isLabelVisible }) => {

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <label htmlFor={name} className='form-input__label'>{label}</label>
      <div className={`input__container ${isFocused ? 'input__container__type_focused' : ''}`}>
        {type === 'number' ?
          <input onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} step=".01" onChange={onChange} value={value || ''} type={type} className={`form-input ${error ? "form-input_type_error" : ""}`} name={name} id={name} required={required} />
          : <input onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={onChange} value={value || ''} type={type} className={`form-input ${error ? "form-input_type_error" : ""}`} name={name} id={name} required={required} />}
        {/* <span className={`form-input__error`}>{error}</span> */}
      </div>
    </>
  )
}

export default FormInput;