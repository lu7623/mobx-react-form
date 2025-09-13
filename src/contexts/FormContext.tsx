/**
 * Form Context for mobx-react-form
 * Provides form instance and related hooks throughout the component tree
 */

import { createContext, useContext, type ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import MyForm from '../Form';

interface FormContextType {
  form: MyForm;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  form: MyForm;
  children: ReactNode;
}

export const FormProvider = observer(({ form, children }: FormProviderProps) => {
  return (
    <FormContext.Provider value={{ form }}>
      {children}
    </FormContext.Provider>
  );
});

// Custom hook to access form instance
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context.form;
};

// Custom hook to access a specific field
export const useField = (path: string) => {
  const form = useFormContext();
  const field = form.$(path);
  
  if (!field) {
    throw new Error(`Field '${path}' not found in form`);
  }
  
  return field;
};

// Custom hook to get field validation state
export const useFieldValidation = (path: string) => {
  const field = useField(path);
  
  return {
    hasError: field.hasError,
    error: field.error,
    isValid: field.isValid,
    isDirty: field.isDirty,
    isPristine: field.isPristine,
    touched: field.touched
  };
};

// Custom hook for form-level validation state
export const useFormValidation = () => {
  const form = useFormContext();
  
  return {
    isValid: form.isValid,
    hasError: form.hasError,
    errors: form.errors(),
    isDirty: form.isDirty,
    isPristine: form.isPristine
  };
};
