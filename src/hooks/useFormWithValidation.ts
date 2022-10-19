import { useState, useCallback } from 'react';
import { ChangeEvent } from 'react';

type useFormWithValidationTypes = {
  values: Record<string, string> 
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  errors: Record<string, string>
  isFormValid: boolean
  resetForm: (
    newValues: Record<string, string>, 
    newErrors: Record<string, string>, 
    newIsFormValid: boolean) => void
}

export function useFormWithValidation ():useFormWithValidationTypes {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: any = e.target;
    const name: string = input.name;
    const value: string = input.value;
    setValues((values) => ({...values, [name]: value}));
    setErrors((errors) => ({...errors, [name]: input.validationMessage}));
    setIsFormValid(input.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsFormValid = (false)) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsFormValid(newIsFormValid);
  }, [setValues, setErrors, setIsFormValid]);

  return {values, handleChange, errors, isFormValid, resetForm}
}