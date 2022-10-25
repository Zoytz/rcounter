import React, { FC, ChangeEvent } from 'react';

type PropsType = {
  value?: string
  type: string
  error?: string
  name: string
  label?: string
  required: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<PropsType> = ({ onChange, value, type, error, name, label, required }) => {
  return (
    <label className='form-input__label'>
      <input placeholder={label} onChange={onChange} value={value || ''} type={type} className="form-input" name={name} id={name} required={required} />
      <span className={`form-input__error`}>{error}</span>
    </label>
  )
}

export default FormInput;