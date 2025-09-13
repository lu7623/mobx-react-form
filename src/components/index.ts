/**
 * UI Components Index
 * Exports all reusable form components
 */

// Individual component exports
export { FormField } from './FormField';
export { NumberField } from './NumberField';
export { BodyMeasurementField } from './BodyMeasurementField';
export { SubmitButton } from './SubmitButton';
export { FormStatus } from './FormStatus';
export { RadioField } from './RadioField';
export { SelectField } from './SelectField';
export { YarnCalculationResults } from './YarnCalculationResults';

// Note: Unified input system removed for simplified approach

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
