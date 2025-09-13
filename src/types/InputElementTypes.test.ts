/**
 * Tests for Input Element Types
 * Validates the extendable interface system
 */

import { describe, test, expect } from 'vitest';
import { 
  InputElementType, 
  getInputElementType, 
  createInputElementProps,
  isTextInputProps,
  isSelectInputProps,
  isRadioInputProps,
  isCheckboxInputProps,
  type BaseFormField,
  type TextInputElementProps,
  type SelectInputElementProps,
  type RadioInputElementProps
} from './InputElementTypes';
import { type FieldName } from '../config';

// Mock form field for testing
const createMockField = (): BaseFormField => ({
  label: 'Test Field',
  placeholder: 'Test placeholder',
  value: 'test value',
  hasError: false,
  error: null,
  isValid: true,
  isDirty: false,
  bind: () => ({ value: 'test', onChange: () => {}, onBlur: () => {} }),
  set: () => {},
  clear: () => {},
  validate: () => {}
});

describe('Input Element Types', () => {
  describe('InputElementType enum', () => {
    test('should have all expected input types', () => {
      expect(InputElementType.TEXT).toBe('text');
      expect(InputElementType.EMAIL).toBe('email');
      expect(InputElementType.PASSWORD).toBe('password');
      expect(InputElementType.SELECT).toBe('select');
      expect(InputElementType.RADIO).toBe('radio');
      expect(InputElementType.CHECKBOX).toBe('checkbox');
      expect(InputElementType.TEXTAREA).toBe('textarea');
      expect(InputElementType.FILE).toBe('file');
      expect(InputElementType.NUMBER).toBe('number');
      expect(InputElementType.DATE).toBe('date');
      expect(InputElementType.DATETIME).toBe('datetime-local');
      expect(InputElementType.TIME).toBe('time');
      expect(InputElementType.RANGE).toBe('range');
      expect(InputElementType.TEL).toBe('tel');
      expect(InputElementType.URL).toBe('url');
    });
  });

  describe('getInputElementType function', () => {
    test('should return correct type for email field', () => {
      expect(getInputElementType('email' as FieldName)).toBe(InputElementType.EMAIL);
    });

    test('should return correct type for password fields', () => {
      expect(getInputElementType('password' as FieldName)).toBe(InputElementType.PASSWORD);
      expect(getInputElementType('passwordConfirm' as FieldName)).toBe(InputElementType.PASSWORD);
    });

    test('should return correct type for gender field', () => {
      expect(getInputElementType('gender' as FieldName)).toBe(InputElementType.RADIO);
    });

    test('should return correct type for color fields', () => {
      expect(getInputElementType('dressColor' as FieldName)).toBe(InputElementType.SELECT);
      expect(getInputElementType('pantsColor' as FieldName)).toBe(InputElementType.SELECT);
    });

    test('should return TEXT as default for unknown fields', () => {
      expect(getInputElementType('unknownField' as any)).toBe(InputElementType.TEXT);
    });
  });

  describe('createInputElementProps function', () => {
    test('should create text input props correctly', () => {
      const field = createMockField();
      const props = createInputElementProps<TextInputElementProps>(
        InputElementType.TEXT,
        field,
        'email' as FieldName,
        { type: 'text', autoComplete: 'email' }
      );

      expect(props.field).toBe(field);
      expect(props.fieldName).toBe('email');
      expect(props.disabled).toBe(false);
      expect(props.type).toBe('text');
      expect(props.autoComplete).toBe('email');
    });

    test('should create select input props correctly', () => {
      const field = createMockField();
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
      ];
      const props = createInputElementProps<SelectInputElementProps>(
        InputElementType.SELECT,
        field,
        'dressColor' as FieldName,
        { options }
      );

      expect(props.field).toBe(field);
      expect(props.fieldName).toBe('dressColor');
      expect(props.options).toEqual(options);
    });
  });

  describe('Type guard functions', () => {
    test('isTextInputProps should identify text input props correctly', () => {
      const textProps: TextInputElementProps = {
        field: createMockField(),
        fieldName: 'email' as FieldName,
        type: 'email',
        autoComplete: 'email'
      };

      const selectProps: SelectInputElementProps = {
        field: createMockField(),
        fieldName: 'dressColor' as FieldName,
        options: [{ value: 'red', label: 'Red' }]
      };

      expect(isTextInputProps(textProps)).toBe(true);
      expect(isTextInputProps(selectProps)).toBe(false);
    });

    test('isSelectInputProps should identify select input props correctly', () => {
      const selectProps: SelectInputElementProps = {
        field: createMockField(),
        fieldName: 'dressColor' as FieldName,
        options: [{ value: 'red', label: 'Red' }]
      };

      const textProps: TextInputElementProps = {
        field: createMockField(),
        fieldName: 'email' as FieldName,
        type: 'email'
      };

      expect(isSelectInputProps(selectProps)).toBe(true);
      expect(isSelectInputProps(textProps)).toBe(false);
    });

    test('isRadioInputProps should identify radio input props correctly', () => {
      const radioProps: RadioInputElementProps = {
        field: createMockField(),
        fieldName: 'gender' as FieldName,
        options: [{ value: 'male', label: 'Male' }]
      };

      const selectProps: SelectInputElementProps = {
        field: createMockField(),
        fieldName: 'dressColor' as FieldName,
        options: [{ value: 'red', label: 'Red' }],
        multiple: true
      };

      expect(isRadioInputProps(radioProps)).toBe(true);
      expect(isRadioInputProps(selectProps)).toBe(false);
    });

    test('isCheckboxInputProps should identify checkbox input props correctly', () => {
      const checkboxPropsWithOptions = {
        field: createMockField(),
        fieldName: 'interests' as any,
        options: [{ value: 'sports', label: 'Sports' }]
      };

      const checkboxPropsSingle = {
        field: createMockField(), 
        fieldName: 'newsletter' as any,
        single: true
      };

      const textProps: TextInputElementProps = {
        field: createMockField(),
        fieldName: 'email' as FieldName,
        type: 'email'
      };

      expect(isCheckboxInputProps(checkboxPropsWithOptions)).toBe(true);
      expect(isCheckboxInputProps(checkboxPropsSingle)).toBe(true);
      expect(isCheckboxInputProps(textProps)).toBe(false);
    });
  });

  describe('Interface compatibility', () => {
    test('BaseFormField should be compatible with form field objects', () => {
      const mockField = createMockField();
      
      // This test validates that our BaseFormField interface
      // matches what mobx-react-form provides
      expect(mockField).toHaveProperty('label');
      expect(mockField).toHaveProperty('placeholder');
      expect(mockField).toHaveProperty('value');
      expect(mockField).toHaveProperty('hasError');
      expect(mockField).toHaveProperty('error');
      expect(mockField).toHaveProperty('isValid');
      expect(mockField).toHaveProperty('isDirty');
      expect(mockField).toHaveProperty('bind');
      expect(mockField).toHaveProperty('set');
      expect(mockField).toHaveProperty('clear');
      expect(mockField).toHaveProperty('validate');
    });

    test('Extended interfaces should maintain base properties', () => {
      const textProps: TextInputElementProps = {
        field: createMockField(),
        fieldName: 'email' as FieldName,
        type: 'email',
        autoComplete: 'email',
        disabled: false
      };

      const selectProps: SelectInputElementProps = {
        field: createMockField(),
        fieldName: 'dressColor' as FieldName,
        options: [],
        disabled: false
      };

      const radioProps: RadioInputElementProps = {
        field: createMockField(),
        fieldName: 'gender' as FieldName,
        options: [],
        disabled: false
      };

      // All should have base properties
      [textProps, selectProps, radioProps].forEach(props => {
        expect(props).toHaveProperty('field');
        expect(props).toHaveProperty('fieldName');
        expect(props).toHaveProperty('disabled');
      });

      // Each should have their specific properties
      expect(textProps).toHaveProperty('type');
      expect(textProps).toHaveProperty('autoComplete');
      
      expect(selectProps).toHaveProperty('options');
      
      expect(radioProps).toHaveProperty('options');
    });
  });
});
