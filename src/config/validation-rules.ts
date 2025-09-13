/**
 * Validation Rules Configuration
 * Contains all validation rules and error messages for the form
 */

/**
 * Individual field validation rules
 */
export const VALIDATION_RULES = {
  yarnLength: 'required|numeric|min:50|max:2000',
  itemType: 'required|in:scarf,sweater,dress',
  length: 'numeric|min:10|max:300',
  size: 'string|in:S,M,L,XL',
  sleevesLength: 'string|in:short,long'
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
  in: 'The :attribute must be one of the available options.',
} as const;

/**
 * Field-specific validation constraints
 */
export const VALIDATION_CONSTRAINTS = {
  yarnLength: {
    minValue: 50,
    maxValue: 2000,
    required: true,
    description: 'Yarn length must be between 50-2000 meters per 100g'
  },
  itemType: {
    allowedValues: ['scarf', 'sweater', 'dress'],
    required: true,
    description: 'Must select an item type'
  },
  length: {
    minValue: 10,
    maxValue: 300,
    description: 'Length must be between 10-300 centimeters'
  },
  size: {
    allowedValues: ['S', 'M', 'L', 'XL'],
    description: 'Select from available sizes'
  },
  sleevesLength: {
    allowedValues: ['short', 'long'],
    description: 'Select sleeves length'
  }
} as const;

/**
 * Validation rule builders for complex scenarios
 */
export const buildValidationRule = {
  required: () => `required`,
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
  yarnLength: {
    required: 'Yarn length is required',
    numeric: 'Please enter a valid number',
    min: 'Yarn length must be at least 50 meters',
    max: 'Yarn length cannot exceed 2000 meters'
  },
  itemType: {
    required: 'Please select an item type',
    in: 'Please select a valid item type'
  },
  length: {
    numeric: 'Please enter a valid number',
    min: 'Length must be at least 10 cm',
    max: 'Length cannot exceed 300 cm'
  },
  size: {
    in: 'Please select a valid size'
  },
  sleevesLength: {
    in: 'Please select a valid sleeves length'
  }
} as const;
