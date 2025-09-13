/**
 * UI Components Index
 * Exports all reusable form components
 */

// Individual component exports
export { FormField } from './FormField';
export { NumberField } from './NumberField';
export { SubmitButton } from './SubmitButton';
export { FormStatus } from './FormStatus';
export { RadioField } from './RadioField';
export { SelectField } from './SelectField';

// Unified input system exports
export { 
  UnifiedInputField,
  TextInputField,
  EmailInputField, 
  PasswordInputField,
  SelectInputField,
  RadioInputField,
  createTypedInputField,
  createInputField
} from './UnifiedInputField';

// Type exports
export type {
  BaseInputElementProps,
  TextInputElementProps,
  SelectInputElementProps,
  RadioInputElementProps,
  CheckboxInputElementProps,
  TextareaInputElementProps,
  FileInputElementProps,
  NumberInputElementProps,
  DateInputElementProps,
  RangeInputElementProps,
  InputElementProps,
  GenericInputProps
} from '../types/InputElementTypes';

export { 
  InputElementType,
  getInputElementType,
  isTextInputProps,
  isSelectInputProps, 
  isRadioInputProps,
  isCheckboxInputProps,
  createInputElementProps
} from '../types/InputElementTypes';
