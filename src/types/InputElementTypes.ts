/**
 * Input Element Types - Extendable Interface System
 * Provides type-safe interfaces for all form input components
 */

import { type FieldName } from '../config';

/**
 * Base field interface that all MobX React Form fields provide
 */
export interface BaseFormField {
  label: string;
  placeholder: string;
  value: string;
  hasError: boolean;
  error: string | null;
  isValid: boolean;
  isDirty: boolean;
  bind: () => any;
  set: (value: string) => void;
  clear: () => void;
  validate: () => void;
}

/**
 * Base props interface for all input components
 */
export interface BaseInputElementProps<TField extends BaseFormField = BaseFormField> {
  field: TField;
  fieldName: FieldName;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * Text Input specific props
 */
export interface TextInputElementProps extends BaseInputElementProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}

/**
 * Select Input specific props
 */
export interface SelectInputElementProps extends BaseInputElementProps {
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  multiple?: boolean;
  size?: number;
}

/**
 * Radio Input specific props
 */
export interface RadioInputElementProps extends BaseInputElementProps {
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  inline?: boolean;
}

/**
 * Checkbox Input specific props
 */
export interface CheckboxInputElementProps extends BaseInputElementProps {
  options?: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  single?: boolean; // For single checkbox
}

/**
 * Textarea Input specific props
 */
export interface TextareaInputElementProps extends BaseInputElementProps {
  rows?: number;
  cols?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  maxLength?: number;
}

/**
 * File Input specific props
 */
export interface FileInputElementProps extends BaseInputElementProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

/**
 * Number Input specific props
 */
export interface NumberInputElementProps extends BaseInputElementProps {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

/**
 * Date Input specific props
 */
export interface DateInputElementProps extends BaseInputElementProps {
  type?: 'date' | 'datetime-local' | 'time' | 'month' | 'week';
  min?: string;
  max?: string;
  step?: number;
}

/**
 * Range Input specific props
 */
export interface RangeInputElementProps extends BaseInputElementProps {
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

/**
 * Union type of all input element props
 */
export type InputElementProps = 
  | TextInputElementProps
  | SelectInputElementProps 
  | RadioInputElementProps
  | CheckboxInputElementProps
  | TextareaInputElementProps
  | FileInputElementProps
  | NumberInputElementProps
  | DateInputElementProps
  | RangeInputElementProps;

/**
 * Input element type constants
 */
export const InputElementType = {
  TEXT: 'text',
  EMAIL: 'email', 
  PASSWORD: 'password',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  FILE: 'file',
  NUMBER: 'number',
  DATE: 'date',
  DATETIME: 'datetime-local',
  TIME: 'time',
  RANGE: 'range',
  TEL: 'tel',
  URL: 'url',
} as const;

export type InputElementType = typeof InputElementType[keyof typeof InputElementType];

/**
 * Input element configuration
 */
export interface InputElementConfig {
  type: InputElementType;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
  appearance?: {
    variant?: 'default' | 'outlined' | 'filled' | 'underlined';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
  };
  behavior?: {
    debounceMs?: number;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    clearOnReset?: boolean;
  };
}

/**
 * Generic input component props
 */
export interface GenericInputProps<T extends InputElementProps = InputElementProps> {
  config: InputElementConfig;
  props: T;
  onValueChange?: (value: string, fieldName: FieldName) => void;
  onValidation?: (isValid: boolean, errors: string[], fieldName: FieldName) => void;
}

/**
 * Input component factory type
 */
export type InputComponentFactory = Record<InputElementType, React.ComponentType<any>>;

/**
 * Field display configuration enhanced with input types
 */
export interface ExtendedFieldDisplay {
  type: InputElementType;
  autoComplete?: string;
  description?: string;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  appearance?: {
    variant?: 'default' | 'outlined' | 'filled';
    size?: 'small' | 'medium' | 'large';
    placeholder?: string;
  };
}

/**
 * Type guard functions
 */
export const isTextInputProps = (props: InputElementProps): props is TextInputElementProps => {
  return 'type' in props && ['text', 'email', 'password', 'tel', 'url'].includes(props.type || 'text');
};

export const isSelectInputProps = (props: InputElementProps): props is SelectInputElementProps => {
  return 'options' in props && Array.isArray(props.options);
};

export const isRadioInputProps = (props: InputElementProps): props is RadioInputElementProps => {
  return 'options' in props && Array.isArray(props.options) && !('multiple' in props);
};

export const isCheckboxInputProps = (props: InputElementProps): props is CheckboxInputElementProps => {
  return 'options' in props || 'single' in props;
};

/**
 * Utility functions
 */
export const getInputElementType = (fieldName: FieldName): InputElementType => {
  // This can be enhanced to dynamically determine type based on field configuration
  switch (fieldName) {
    case 'email':
      return InputElementType.EMAIL;
    case 'password':
    case 'passwordConfirm':
      return InputElementType.PASSWORD;
    case 'gender':
      return InputElementType.RADIO;
    case 'dressColor':
    case 'pantsColor':
      return InputElementType.SELECT;
    default:
      return InputElementType.TEXT;
  }
};

export const createInputElementProps = <T extends InputElementProps>(
  _type: InputElementType,
  field: BaseFormField,
  fieldName: FieldName,
  additionalProps?: Partial<T>
): T => {
  const baseProps = {
    field,
    fieldName,
    disabled: false,
    ...additionalProps
  };
  
  return baseProps as T;
};
