/**
 * Form Field Definitions
 * Contains field configurations including labels, placeholders, and default values
 */

export interface FieldDefinition {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  rules: string;
}

export const FORM_FIELDS: FieldDefinition[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    value: 's.jobs@apple.com',
    rules: 'required|email|string|between:5,25'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25'
  },
  {
    name: 'passwordConfirm',
    label: 'Password Confirmation',
    placeholder: 'Confirm Password',
    rules: 'required|string|same:password'
  }
];

/**
 * Get field configuration by name
 */
export const getFieldConfig = (fieldName: string): FieldDefinition | undefined => {
  return FORM_FIELDS.find(field => field.name === fieldName);
};

/**
 * Get all field names
 */
export const getFieldNames = (): string[] => {
  return FORM_FIELDS.map(field => field.name);
};

/**
 * Field display configuration
 */
export const FIELD_DISPLAY = {
  email: {
    type: 'email',
    autoComplete: 'email',
    description: 'Enter a valid email address (5-25 characters)'
  },
  password: {
    type: 'password',
    autoComplete: 'new-password',
    description: 'Password must be between 5-25 characters'
  },
  passwordConfirm: {
    type: 'password',
    autoComplete: 'new-password',
    description: 'Re-enter your password to confirm'
  }
} as const;

export type FieldName = keyof typeof FIELD_DISPLAY;
