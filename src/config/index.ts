/**
 * Configuration Module Index
 * Exports all configuration modules for easy importing
 */

export * from './fields';
export * from './validation-rules';
export * from './computed-fields';

/**
 * Re-export commonly used configurations
 */
export { FORM_FIELDS, getFieldConfig, getFieldNames, FIELD_DISPLAY, type FieldName } from './fields';
export { 
  VALIDATION_RULES, 
  VALIDATION_MESSAGES, 
  VALIDATION_CONSTRAINTS,
  getValidationRule,
  getValidationConstraints,
  buildValidationRule,
  FIELD_ERROR_MESSAGES
} from './validation-rules';
