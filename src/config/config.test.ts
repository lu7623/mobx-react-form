/**
 * Tests for Yarn Calculations Form Configuration
 * Testing field definitions, validation rules, and display configurations
 */

import { describe, test, expect } from 'vitest';
import { 
  FORM_FIELDS, 
  getFieldConfig, 
  getFieldNames, 
  FIELD_DISPLAY,
  type FieldName
} from './fields';
import { 
  VALIDATION_RULES, 
  getValidationRule,
  getValidationConstraints,
  buildValidationRule,
  VALIDATION_CONSTRAINTS,
  VALIDATION_MESSAGES,
  FIELD_ERROR_MESSAGES
} from './validation-rules';

describe('Yarn Calculations Form Configuration Tests', () => {
  describe('Field Configuration Tests', () => {
    describe('FORM_FIELDS', () => {
      test('should have correct number of fields for yarn form', () => {
        expect(FORM_FIELDS).toHaveLength(5);
      });

      test('should have all required field properties', () => {
        FORM_FIELDS.forEach(field => {
          expect(field).toHaveProperty('name');
          expect(field).toHaveProperty('label');
          expect(field).toHaveProperty('placeholder');
          expect(field).toHaveProperty('rules');
          expect(field).toHaveProperty('value');
        });
      });

      test('should have correct yarn calculation field names', () => {
        const fieldNames = FORM_FIELDS.map(f => f.name);
        expect(fieldNames).toEqual(['yarnLength', 'itemType', 'length', 'size', 'sleevesLength']);
      });

      test('should have yarnLength field with empty default value', () => {
        const yarnLengthField = FORM_FIELDS.find(f => f.name === 'yarnLength');
        expect(yarnLengthField).toBeDefined();
        expect(yarnLengthField?.value).toBe('');
      });

      test('should have required fields marked correctly', () => {
        const yarnLengthField = FORM_FIELDS.find(f => f.name === 'yarnLength');
        const itemTypeField = FORM_FIELDS.find(f => f.name === 'itemType');
        
        expect(yarnLengthField?.rules).toContain('required');
        expect(itemTypeField?.rules).toContain('required');
      });
    });

    describe('Field Helper Functions', () => {
      test('getFieldConfig should return correct field for yarn fields', () => {
        const yarnLengthConfig = getFieldConfig('yarnLength');
        expect(yarnLengthConfig?.name).toBe('yarnLength');
        expect(yarnLengthConfig?.label).toBe('Yarn Length per 100g');
        expect(yarnLengthConfig?.placeholder).toBe('Enter yarn length in meters');
      });

      test('getFieldConfig should return undefined for non-existent field', () => {
        const nonExistentConfig = getFieldConfig('nonExistent');
        expect(nonExistentConfig).toBeUndefined();
      });

      test('getFieldNames should return all yarn calculation field names', () => {
        const names = getFieldNames();
        expect(names).toEqual(['yarnLength', 'itemType', 'length', 'size', 'sleevesLength']);
      });
    });

    describe('FIELD_DISPLAY', () => {
      test('should have display config for all yarn fields', () => {
        expect(FIELD_DISPLAY).toHaveProperty('yarnLength');
        expect(FIELD_DISPLAY).toHaveProperty('itemType');
        expect(FIELD_DISPLAY).toHaveProperty('length');
        expect(FIELD_DISPLAY).toHaveProperty('size');
        expect(FIELD_DISPLAY).toHaveProperty('sleevesLength');
      });

      test('should have correct input types for yarn fields', () => {
        expect(FIELD_DISPLAY.yarnLength.type).toBe('number');
        expect(FIELD_DISPLAY.itemType.type).toBe('select');
        expect(FIELD_DISPLAY.length.type).toBe('number');
        expect(FIELD_DISPLAY.size.type).toBe('select');
        expect(FIELD_DISPLAY.sleevesLength.type).toBe('radio');
      });

      test('should have descriptions for all yarn fields', () => {
        Object.values(FIELD_DISPLAY).forEach(config => {
          expect(config).toHaveProperty('description');
          expect(config.description).toBeTruthy();
        });
      });

      test('should have options for select and radio fields', () => {
        expect(FIELD_DISPLAY.itemType.options).toBeDefined();
        expect(FIELD_DISPLAY.itemType.options).toHaveLength(3);
        
        expect(FIELD_DISPLAY.size.options).toBeDefined();
        expect(FIELD_DISPLAY.size.options).toHaveLength(4);
        
        expect(FIELD_DISPLAY.sleevesLength.options).toBeDefined();
        expect(FIELD_DISPLAY.sleevesLength.options).toHaveLength(2);
      });

      test('should have min/max for number fields', () => {
        expect(FIELD_DISPLAY.yarnLength).toHaveProperty('min');
        expect(FIELD_DISPLAY.yarnLength).toHaveProperty('max');
        expect(FIELD_DISPLAY.yarnLength.min).toBe(50);
        expect(FIELD_DISPLAY.yarnLength.max).toBe(2000);

        expect(FIELD_DISPLAY.length).toHaveProperty('min');
        expect(FIELD_DISPLAY.length).toHaveProperty('max');
        expect(FIELD_DISPLAY.length.min).toBe(10);
        expect(FIELD_DISPLAY.length.max).toBe(300);
      });
    });
  });

  describe('Validation Rules Configuration Tests', () => {
    describe('VALIDATION_RULES', () => {
      test('should have rules for all yarn fields', () => {
        expect(VALIDATION_RULES).toHaveProperty('yarnLength');
        expect(VALIDATION_RULES).toHaveProperty('itemType');
        expect(VALIDATION_RULES).toHaveProperty('length');
        expect(VALIDATION_RULES).toHaveProperty('size');
        expect(VALIDATION_RULES).toHaveProperty('sleevesLength');
      });

      test('should have correct yarn length validation rule', () => {
        expect(VALIDATION_RULES.yarnLength).toBe('required|numeric|min:50|max:2000');
      });

      test('should have correct item type validation rule', () => {
        expect(VALIDATION_RULES.itemType).toBe('required|in:scarf,sweater,dress');
      });

      test('should have correct length validation rule', () => {
        expect(VALIDATION_RULES.length).toBe('numeric|min:10|max:300');
      });

      test('should have correct size validation rule', () => {
        expect(VALIDATION_RULES.size).toBe('string|in:S,M,L,XL');
      });

      test('should have correct sleeves length validation rule', () => {
        expect(VALIDATION_RULES.sleevesLength).toBe('string|in:short,long');
      });
    });

    describe('VALIDATION_MESSAGES', () => {
      test('should have all required message types', () => {
        expect(VALIDATION_MESSAGES).toHaveProperty('required');
        expect(VALIDATION_MESSAGES).toHaveProperty('string');
        expect(VALIDATION_MESSAGES).toHaveProperty('between');
        expect(VALIDATION_MESSAGES).toHaveProperty('same');
        expect(VALIDATION_MESSAGES).toHaveProperty('in');
      });

      test('should have between messages for numeric and string', () => {
        expect(VALIDATION_MESSAGES.between).toHaveProperty('numeric');
        expect(VALIDATION_MESSAGES.between).toHaveProperty('string');
      });
    });

    describe('VALIDATION_CONSTRAINTS', () => {
      test('should have constraints for all yarn fields', () => {
        expect(VALIDATION_CONSTRAINTS).toHaveProperty('yarnLength');
        expect(VALIDATION_CONSTRAINTS).toHaveProperty('itemType');
        expect(VALIDATION_CONSTRAINTS).toHaveProperty('length');
        expect(VALIDATION_CONSTRAINTS).toHaveProperty('size');
        expect(VALIDATION_CONSTRAINTS).toHaveProperty('sleevesLength');
      });

      test('should have correct yarn length constraints', () => {
        const yarnConstraints = VALIDATION_CONSTRAINTS.yarnLength;
        expect(yarnConstraints.minValue).toBe(50);
        expect(yarnConstraints.maxValue).toBe(2000);
        expect(yarnConstraints.required).toBe(true);
      });

      test('should have correct item type constraints', () => {
        const itemConstraints = VALIDATION_CONSTRAINTS.itemType;
        expect(itemConstraints.allowedValues).toEqual(['scarf', 'sweater', 'dress']);
        expect(itemConstraints.required).toBe(true);
      });

      test('should have correct length constraints', () => {
        const lengthConstraints = VALIDATION_CONSTRAINTS.length;
        expect(lengthConstraints.minValue).toBe(10);
        expect(lengthConstraints.maxValue).toBe(300);
      });

      test('should have correct size constraints', () => {
        const sizeConstraints = VALIDATION_CONSTRAINTS.size;
        expect(sizeConstraints.allowedValues).toEqual(['S', 'M', 'L', 'XL']);
      });

      test('should have correct sleeves length constraints', () => {
        const sleevesConstraints = VALIDATION_CONSTRAINTS.sleevesLength;
        expect(sleevesConstraints.allowedValues).toEqual(['short', 'long']);
      });
    });

    describe('Validation Helper Functions', () => {
      test('getValidationRule should return correct rule', () => {
        expect(getValidationRule('yarnLength')).toBe('required|numeric|min:50|max:2000');
        expect(getValidationRule('itemType')).toBe('required|in:scarf,sweater,dress');
      });

      test('getValidationConstraints should return correct constraints', () => {
        const yarnConstraints = getValidationConstraints('yarnLength');
        expect(yarnConstraints.minValue).toBe(50);
        expect(yarnConstraints.maxValue).toBe(2000);
        expect(yarnConstraints.required).toBe(true);
      });
    });

    describe('buildValidationRule', () => {
      test('should build individual rules correctly', () => {
        expect(buildValidationRule.required()).toBe('required');
        expect(buildValidationRule.string()).toBe('string');
      });

      test('should build composite rules correctly', () => {
        expect(buildValidationRule.emailField(5, 25)).toBe('required|email|string|between:5,25');
        expect(buildValidationRule.passwordField(8, 50)).toBe('required|string|between:8,50');
      });
    });

    describe('FIELD_ERROR_MESSAGES', () => {
      test('should have error messages for all yarn fields', () => {
        expect(FIELD_ERROR_MESSAGES).toHaveProperty('yarnLength');
        expect(FIELD_ERROR_MESSAGES).toHaveProperty('itemType');
        expect(FIELD_ERROR_MESSAGES).toHaveProperty('length');
        expect(FIELD_ERROR_MESSAGES).toHaveProperty('size');
        expect(FIELD_ERROR_MESSAGES).toHaveProperty('sleevesLength');
      });

      test('should have specific error messages for each validation type', () => {
        const yarnMessages = FIELD_ERROR_MESSAGES.yarnLength;
        expect(yarnMessages).toHaveProperty('required');
        expect(yarnMessages).toHaveProperty('numeric');
        expect(yarnMessages).toHaveProperty('min');
        expect(yarnMessages).toHaveProperty('max');

        const itemMessages = FIELD_ERROR_MESSAGES.itemType;
        expect(itemMessages).toHaveProperty('required');
        expect(itemMessages).toHaveProperty('in');
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
        expect(FIELD_DISPLAY[fieldName as FieldName]).toBeDefined();
        
        // Check error messages exist
        expect(FIELD_ERROR_MESSAGES[fieldName as keyof typeof FIELD_ERROR_MESSAGES]).toBeDefined();
      });
    });

    test('select and radio fields should have matching options', () => {
      // Check item type options match validation constraints
      const itemTypeDisplay = FIELD_DISPLAY.itemType;
      const itemTypeConstraints = VALIDATION_CONSTRAINTS.itemType;
      
      if ('options' in itemTypeDisplay && itemTypeDisplay.options) {
        const displayValues = itemTypeDisplay.options.map(opt => opt.value);
        expect(displayValues.sort()).toEqual(itemTypeConstraints.allowedValues.sort());
      }

      // Check size options match validation constraints
      const sizeDisplay = FIELD_DISPLAY.size;
      const sizeConstraints = VALIDATION_CONSTRAINTS.size;
      
      if ('options' in sizeDisplay && sizeDisplay.options) {
        const displayValues = sizeDisplay.options.map(opt => opt.value);
        expect(displayValues.sort()).toEqual(sizeConstraints.allowedValues.sort());
      }

      // Check sleeves length options match validation constraints
      const sleevesDisplay = FIELD_DISPLAY.sleevesLength;
      const sleevesConstraints = VALIDATION_CONSTRAINTS.sleevesLength;
      
      if ('options' in sleevesDisplay && sleevesDisplay.options) {
        const displayValues = sleevesDisplay.options.map(opt => opt.value);
        expect(displayValues.sort()).toEqual(sleevesConstraints.allowedValues.sort());
      }
    });

    test('number fields should have matching min/max values', () => {
      // Check yarn length min/max
      const yarnLengthDisplay = FIELD_DISPLAY.yarnLength;
      const yarnLengthConstraints = VALIDATION_CONSTRAINTS.yarnLength;
      
      if ('min' in yarnLengthDisplay && 'max' in yarnLengthDisplay) {
        expect(yarnLengthDisplay.min).toBe(yarnLengthConstraints.minValue);
        expect(yarnLengthDisplay.max).toBe(yarnLengthConstraints.maxValue);
      }

      // Check length min/max
      const lengthDisplay = FIELD_DISPLAY.length;
      const lengthConstraints = VALIDATION_CONSTRAINTS.length;
      
      if ('min' in lengthDisplay && 'max' in lengthDisplay) {
        expect(lengthDisplay.min).toBe(lengthConstraints.minValue);
        expect(lengthDisplay.max).toBe(lengthConstraints.maxValue);
      }
    });
  });
});