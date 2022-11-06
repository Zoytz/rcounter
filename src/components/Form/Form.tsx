import { FC, ReactNode } from 'react';

type PropsType = {
  handleSubmit: (param: any) => void
  formTitle: string
  formName: string
  children: ReactNode
}

const Form: FC<PropsType> = ({ formTitle, formName, children, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={`form form_type_${formName} page__form`} name="servicesForm" noValidate>
      <h1 className="form__title">{formTitle}</h1>
      { children }
    </form>
  )
}

export default Form;