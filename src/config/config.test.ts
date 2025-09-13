/**
 * Configuration Module Tests
 * Tests the field and validation rule configurations
 */

import { 
  FORM_FIELDS, 
  getFieldConfig, 
  getFieldNames, 
  FIELD_DISPLAY,
  FieldDefinition 
} from './fields';

import { 
  VALIDATION_RULES, 
  VALIDATION_MESSAGES, 
  VALIDATION_CONSTRAINTS,
  getValidationRule,
  getValidationConstraints,
  buildValidationRule,
  FIELD_ERROR_MESSAGES
} from './validation-rules';

describe('Field Configuration Tests', () => {
  describe('FORM_FIELDS', () => {
    test('should have correct number of fields', () => {
      expect(FORM_FIELDS).toHaveLength(3);
    });

    test('should have all required field properties', () => {
      FORM_FIELDS.forEach((field: FieldDefinition) => {
        expect(field).toHaveProperty('name');
        expect(field).toHaveProperty('label');
        expect(field).toHaveProperty('placeholder');
        expect(field).toHaveProperty('rules');
        expect(typeof field.name).toBe('string');
        expect(typeof field.label).toBe('string');
        expect(typeof field.placeholder).toBe('string');
        expect(typeof field.rules).toBe('string');
      });
    });

    test('should have correct field names', () => {
      const fieldNames = FORM_FIELDS.map(f => f.name);
      expect(fieldNames).toEqual(['email', 'password', 'passwordConfirm']);
    });

    test('should have email field with default value', () => {
      const emailField = FORM_FIELDS.find(f => f.name === 'email');
      expect(emailField).toBeDefined();
      expect(emailField?.value).toBe('s.jobs@apple.com');
    });
  });

  describe('Field Helper Functions', () => {
    test('getFieldConfig should return correct field', () => {
      const emailConfig = getFieldConfig('email');
      expect(emailConfig?.name).toBe('email');
      expect(emailConfig?.label).toBe('Email');
      expect(emailConfig?.placeholder).toBe('Insert Email');
    });

    test('getFieldConfig should return undefined for non-existent field', () => {
      const config = getFieldConfig('nonexistent');
      expect(config).toBeUndefined();
    });

    test('getFieldNames should return all field names', () => {
      const names = getFieldNames();
      expect(names).toEqual(['email', 'password', 'passwordConfirm']);
    });
  });

  describe('FIELD_DISPLAY', () => {
    test('should have display config for all fields', () => {
      expect(FIELD_DISPLAY).toHaveProperty('email');
      expect(FIELD_DISPLAY).toHaveProperty('password');
      expect(FIELD_DISPLAY).toHaveProperty('passwordConfirm');
    });

    test('should have correct input types', () => {
      expect(FIELD_DISPLAY.email.type).toBe('email');
      expect(FIELD_DISPLAY.password.type).toBe('password');
      expect(FIELD_DISPLAY.passwordConfirm.type).toBe('password');
    });

    test('should have descriptions for all fields', () => {
      Object.values(FIELD_DISPLAY).forEach(config => {
        expect(config).toHaveProperty('description');
        expect(typeof config.description).toBe('string');
      });
    });
  });
});

describe('Validation Rules Configuration Tests', () => {
  describe('VALIDATION_RULES', () => {
    test('should have rules for all fields', () => {
      expect(VALIDATION_RULES).toHaveProperty('email');
      expect(VALIDATION_RULES).toHaveProperty('password');
      expect(VALIDATION_RULES).toHaveProperty('passwordConfirm');
    });

    test('should have correct email validation rule', () => {
      expect(VALIDATION_RULES.email).toBe('required|email|string|between:5,25');
    });

    test('should have correct password validation rule', () => {
      expect(VALIDATION_RULES.password).toBe('required|string|between:5,25');
    });

    test('should have correct password confirmation validation rule', () => {
      expect(VALIDATION_RULES.passwordConfirm).toBe('required|string|same:password');
    });
  });

  describe('VALIDATION_MESSAGES', () => {
    test('should have all required message types', () => {
      expect(VALIDATION_MESSAGES).toHaveProperty('required');
      expect(VALIDATION_MESSAGES).toHaveProperty('email');
      expect(VALIDATION_MESSAGES).toHaveProperty('string');
      expect(VALIDATION_MESSAGES).toHaveProperty('between');
      expect(VALIDATION_MESSAGES).toHaveProperty('same');
    });

    test('should have between messages for numeric and string', () => {
      expect(VALIDATION_MESSAGES.between).toHaveProperty('numeric');
      expect(VALIDATION_MESSAGES.between).toHaveProperty('string');
    });
  });

  describe('VALIDATION_CONSTRAINTS', () => {
    test('should have constraints for all fields', () => {
      expect(VALIDATION_CONSTRAINTS).toHaveProperty('email');
      expect(VALIDATION_CONSTRAINTS).toHaveProperty('password');
      expect(VALIDATION_CONSTRAINTS).toHaveProperty('passwordConfirm');
    });

    test('should have correct email constraints', () => {
      const emailConstraints = VALIDATION_CONSTRAINTS.email;
      expect(emailConstraints.minLength).toBe(5);
      expect(emailConstraints.maxLength).toBe(25);
      expect(emailConstraints.pattern).toBeInstanceOf(RegExp);
    });

    test('should have correct password constraints', () => {
      const passwordConstraints = VALIDATION_CONSTRAINTS.password;
      expect(passwordConstraints.minLength).toBe(5);
      expect(passwordConstraints.maxLength).toBe(25);
    });

    test('should have correct password confirmation constraints', () => {
      const confirmConstraints = VALIDATION_CONSTRAINTS.passwordConfirm;
      expect(confirmConstraints.minLength).toBe(5);
      expect(confirmConstraints.maxLength).toBe(25);
      expect(confirmConstraints.mustMatchField).toBe('password');
    });
  });

  describe('Validation Helper Functions', () => {
    test('getValidationRule should return correct rule', () => {
      const emailRule = getValidationRule('email');
      expect(emailRule).toBe('required|email|string|between:5,25');
    });

    test('getValidationConstraints should return correct constraints', () => {
      const emailConstraints = getValidationConstraints('email');
      expect(emailConstraints.minLength).toBe(5);
      expect(emailConstraints.maxLength).toBe(25);
    });
  });

  describe('buildValidationRule', () => {
    test('should build individual rules correctly', () => {
      expect(buildValidationRule.required('test')).toBe('required');
      expect(buildValidationRule.email()).toBe('email');
      expect(buildValidationRule.string()).toBe('string');
      expect(buildValidationRule.between(5, 25)).toBe('between:5,25');
      expect(buildValidationRule.same('password')).toBe('same:password');
    });

    test('should build composite rules correctly', () => {
      expect(buildValidationRule.emailField()).toBe('required|email|string|between:5,25');
      expect(buildValidationRule.emailField(3, 50)).toBe('required|email|string|between:3,50');
      
      expect(buildValidationRule.passwordField()).toBe('required|string|between:5,25');
      expect(buildValidationRule.passwordField(8, 100)).toBe('required|string|between:8,100');
      
      expect(buildValidationRule.confirmationField('password')).toBe('required|string|between:5,25|same:password');
      expect(buildValidationRule.confirmationField('password', 8, 100)).toBe('required|string|between:8,100|same:password');
    });
  });

  describe('FIELD_ERROR_MESSAGES', () => {
    test('should have error messages for all fields', () => {
      expect(FIELD_ERROR_MESSAGES).toHaveProperty('email');
      expect(FIELD_ERROR_MESSAGES).toHaveProperty('password');
      expect(FIELD_ERROR_MESSAGES).toHaveProperty('passwordConfirm');
    });

    test('should have specific error messages for each validation type', () => {
      // Email field errors
      expect(FIELD_ERROR_MESSAGES.email).toHaveProperty('required');
      expect(FIELD_ERROR_MESSAGES.email).toHaveProperty('email');
      expect(FIELD_ERROR_MESSAGES.email).toHaveProperty('between');

      // Password field errors
      expect(FIELD_ERROR_MESSAGES.password).toHaveProperty('required');
      expect(FIELD_ERROR_MESSAGES.password).toHaveProperty('between');

      // Password confirmation field errors
      expect(FIELD_ERROR_MESSAGES.passwordConfirm).toHaveProperty('required');
      expect(FIELD_ERROR_MESSAGES.passwordConfirm).toHaveProperty('same');
      expect(FIELD_ERROR_MESSAGES.passwordConfirm).toHaveProperty('between');
    });
  });
});

describe('Configuration Integration Tests', () => {
  test('field definitions should match validation rules', () => {
    FORM_FIELDS.forEach(field => {
      const validationRule = getValidationRule(field.name as keyof typeof VALIDATION_RULES);
      expect(field.rules).toBe(validationRule);
    });
  });

  test('field names should be consistent across configurations', () => {
    const fieldNames = getFieldNames();
    const validationRuleKeys = Object.keys(VALIDATION_RULES);
    const constraintKeys = Object.keys(VALIDATION_CONSTRAINTS);
    const displayKeys = Object.keys(FIELD_DISPLAY);
    const errorMessageKeys = Object.keys(FIELD_ERROR_MESSAGES);

    expect(fieldNames.sort()).toEqual(validationRuleKeys.sort());
    expect(fieldNames.sort()).toEqual(constraintKeys.sort());
    expect(fieldNames.sort()).toEqual(displayKeys.sort());
    expect(fieldNames.sort()).toEqual(errorMessageKeys.sort());
  });

  test('all field configurations should be complete', () => {
    const fieldNames = getFieldNames();
    
    fieldNames.forEach(fieldName => {
      // Check field definition exists
      expect(getFieldConfig(fieldName)).toBeDefined();
      
      // Check validation rule exists
      expect(VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES]).toBeDefined();
      
      // Check constraints exist
      expect(VALIDATION_CONSTRAINTS[fieldName as keyof typeof VALIDATION_CONSTRAINTS]).toBeDefined();
      
      // Check display config exists
      expect(FIELD_DISPLAY[fieldName as keyof typeof FIELD_DISPLAY]).toBeDefined();
      
      // Check error messages exist
      expect(FIELD_ERROR_MESSAGES[fieldName as keyof typeof FIELD_ERROR_MESSAGES]).toBeDefined();
    });
  });
});
