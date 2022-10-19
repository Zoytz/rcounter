import React, { FC, ChangeEvent } from 'react';

type PropsType = {
  value?: string
  type: string
  error?: string
  name: string
  label?: string
  onChange: (e:ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<PropsType> = ({ onChange, value, type, error, name, label}) => {
  return (
    <label className="form-input__label">
      { label }
      <input onChange={onChange} value={value || ''} type={type} className="form-input" name={name} id={name} required />
      <span className={`form-input__error`}>{error}</span>
    </label>
  )
}

export default FormInput;