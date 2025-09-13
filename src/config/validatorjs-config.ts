/**
 * ValidatorJS Configuration
 * Centralized setup for validation messages and language settings
 */

import validatorjs from 'validatorjs';

/**
 * Initialize validatorjs with proper configuration
 * This prevents "Cannot read properties of undefined" errors
 */
export const initializeValidatorJS = () => {
  // Set language
  validatorjs.useLang('en');

  // Configure validation messages
  validatorjs.setMessages('en', {
    required: 'This field is required.',
    numeric: 'This field must be a number.',
    string: 'This field must be a string.',
    min: {
      numeric: 'This field must be at least :min.',
      string: 'This field must be at least :min characters.'
    },
    max: {
      numeric: 'This field must not exceed :max.',
      string: 'This field must not exceed :max characters.'
    },
    between: {
      numeric: 'This field must be between :min and :max.',
      string: 'This field must be between :min and :max characters.'
    },
    in: 'This field must be one of: :values.',
    email: 'Please enter a valid email address.',
    confirmed: 'The :attribute confirmation does not match.',
    same: 'The :attribute and :other must match.',
    different: 'The :attribute and :other must be different.',
    accepted: 'The :attribute must be accepted.',
    array: 'The :attribute must be an array.',
    boolean: 'The :attribute field must be true or false.',
    integer: 'The :attribute must be an integer.',
    ip: 'The :attribute must be a valid IP address.',
    url: 'The :attribute format is invalid.',
    alpha: 'The :attribute may only contain letters.',
    alpha_dash: 'The :attribute may only contain letters, numbers, dashes and underscores.',
    alpha_num: 'The :attribute may only contain letters and numbers.',
    date: 'The :attribute is not a valid date.',
    date_format: 'The :attribute does not match the format :format.',
    digits: 'The :attribute must be :digits digits.',
    digits_between: 'The :attribute must be between :min and :max digits.',
    regex: 'The :attribute format is invalid.'
  });

  console.log('✅ ValidatorJS initialized with custom messages');
};

/**
 * Custom validation messages for specific use cases
 */
export const CUSTOM_VALIDATION_MESSAGES = {
  yarnLength: {
    required: 'Yarn length is required for calculations.',
    numeric: 'Yarn length must be a valid number.',
    min: 'Yarn length must be at least 50 meters.',
    max: 'Yarn length cannot exceed 800 meters.'
  },
  itemType: {
    required: 'Please select an item type.',
    in: 'Item type must be scarf, sweater, or dress.'
  },
  bodyMeasurements: {
    waist: {
      numeric: 'Waist measurement must be a valid number.',
      min: 'Waist measurement must be at least 40cm.',
      max: 'Waist measurement cannot exceed 180cm.'
    },
    chest: {
      numeric: 'Chest measurement must be a valid number.',  
      min: 'Chest measurement must be at least 50cm.',
      max: 'Chest measurement cannot exceed 200cm.'
    },
    hips: {
      numeric: 'Hips measurement must be a valid number.',
      min: 'Hips measurement must be at least 60cm.',
      max: 'Hips measurement cannot exceed 220cm.'
    }
  }
};

// Initialize immediately when this module is imported
initializeValidatorJS();
