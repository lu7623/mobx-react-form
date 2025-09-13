/**
 * Validation Rules Configuration
 * Contains all validation rules and error messages for the form
 */

/**
 * Individual field validation rules
 */
export const VALIDATION_RULES = {
  email: 'required|email|string|between:5,25',
  password: 'required|string|between:5,25',
  passwordConfirm: 'required|string|same:password'
} as const;

/**
 * Custom validation error messages
 * These override the default validatorjs messages
 */
export const VALIDATION_MESSAGES = {
  required: 'The :attribute field is required.',
  email: 'The :attribute format is invalid.',
  string: 'The :attribute must be a string.',
  between: {
    numeric: 'The :attribute must be between :min and :max.',
    string: 'The :attribute must be between :min and :max characters.',
  },
  same: 'The :attribute and :other must match.',
} as const;

/**
 * Field-specific validation constraints
 */
export const VALIDATION_CONSTRAINTS = {
  email: {
    minLength: 5,
    maxLength: 25,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    description: 'Must be a valid email address between 5-25 characters'
  },
  password: {
    minLength: 5,
    maxLength: 25,
    description: 'Must be between 5-25 characters long'
  },
  passwordConfirm: {
    minLength: 5,
    maxLength: 25,
    mustMatchField: 'password',
    description: 'Must match the password field exactly'
  }
} as const;

/**
 * Validation rule builders for complex scenarios
 */
export const buildValidationRule = {
  required: (fieldName: string) => `required`,
  email: () => `email`,
  string: () => `string`,
  between: (min: number, max: number) => `between:${min},${max}`,
  same: (fieldName: string) => `same:${fieldName}`,
  
  // Composite rule builders
  emailField: (min: number = 5, max: number = 25) => 
    `required|email|string|between:${min},${max}`,
  
  passwordField: (min: number = 5, max: number = 25) => 
    `required|string|between:${min},${max}`,
  
  confirmationField: (targetField: string, min: number = 5, max: number = 25) => 
    `required|string|between:${min},${max}|same:${targetField}`
};

/**
 * Get validation rule for a specific field
 */
export const getValidationRule = (fieldName: keyof typeof VALIDATION_RULES): string => {
  return VALIDATION_RULES[fieldName];
};

/**
 * Get validation constraints for a specific field
 */
export const getValidationConstraints = (fieldName: keyof typeof VALIDATION_CONSTRAINTS) => {
  return VALIDATION_CONSTRAINTS[fieldName];
};

/**
 * Validation error message templates by field
 */
export const FIELD_ERROR_MESSAGES = {
  email: {
    required: 'Email address is required',
    email: 'Please enter a valid email address',
    between: 'Email must be between 5 and 25 characters'
  },
  password: {
    required: 'Password is required',
    between: 'Password must be between 5 and 25 characters'
  },
  passwordConfirm: {
    required: 'Password confirmation is required',
    same: 'Passwords must match exactly',
    between: 'Password confirmation must be between 5 and 25 characters'
  }
} as const;
