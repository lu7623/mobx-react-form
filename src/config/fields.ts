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
  },
  {
    name: 'gender',
    label: 'Choose Gender',
    placeholder: 'Select your gender',
    rules: 'required|in:female,male',
    value: ''
  },
  {
    name: 'dressColor',
    label: 'Choose Dress Color',
    placeholder: 'Select dress color',
    rules: 'string|in:white,red,yellow',
    value: ''
  },
  {
    name: 'pantsColor',
    label: 'Choose Pants Color',
    placeholder: 'Select pants color',
    rules: 'string|in:black,blue,brown',
    value: ''
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
  },
  gender: {
    type: 'radio',
    autoComplete: 'sex',
    description: 'Select your gender',
    options: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' }
    ]
  },
  dressColor: {
    type: 'select',
    autoComplete: 'off',
    description: 'Choose your dress color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'red', label: 'Red' },
      { value: 'yellow', label: 'Yellow' }
    ]
  },
  pantsColor: {
    type: 'select',
    autoComplete: 'off', 
    description: 'Choose your pants color',
    options: [
      { value: 'black', label: 'Black' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' }
    ]
  }
} as const;

export type FieldName = keyof typeof FIELD_DISPLAY;
