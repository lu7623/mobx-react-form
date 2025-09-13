/**
 * Tests for Computed Fields Configuration
 * Testing mobx-react-form's native computed props functionality
 */

import { describe, test, expect } from 'vitest';
import { 
  COMPUTED_FIELD_PROPS,
  getComputedDisabled,
  getComputedLabel,
  getComputedPlaceholder
} from './computed-fields';

// Mock form and field objects for testing
const createMockForm = (genderValue: string) => ({
  $: (fieldName: string) => ({
    value: fieldName === 'gender' ? genderValue : ''
  })
});

const mockField = {};

describe('Computed Fields Configuration', () => {
  describe('COMPUTED_FIELD_PROPS', () => {
    test('should have correct structure', () => {
      expect(COMPUTED_FIELD_PROPS).toHaveProperty('dressColor.disabled');
      expect(COMPUTED_FIELD_PROPS).toHaveProperty('pantsColor.disabled');
      expect(COMPUTED_FIELD_PROPS).toHaveProperty('dressColor.label');
      expect(COMPUTED_FIELD_PROPS).toHaveProperty('pantsColor.label');
      expect(COMPUTED_FIELD_PROPS).toHaveProperty('dressColor.placeholder');
      expect(COMPUTED_FIELD_PROPS).toHaveProperty('pantsColor.placeholder');
    });

    test('should contain functions for computed properties', () => {
      expect(typeof COMPUTED_FIELD_PROPS['dressColor.disabled']).toBe('function');
      expect(typeof COMPUTED_FIELD_PROPS['pantsColor.disabled']).toBe('function');
      expect(typeof COMPUTED_FIELD_PROPS['dressColor.label']).toBe('function');
      expect(typeof COMPUTED_FIELD_PROPS['pantsColor.label']).toBe('function');
    });
  });

  describe('dressColor.disabled computation', () => {
    test('should be disabled when gender is male', () => {
      const form = createMockForm('male');
      const disabledFn = COMPUTED_FIELD_PROPS['dressColor.disabled'];
      
      expect(disabledFn({ form, field: mockField })).toBe(true);
    });

    test('should be enabled when gender is female', () => {
      const form = createMockForm('female');
      const disabledFn = COMPUTED_FIELD_PROPS['dressColor.disabled'];
      
      expect(disabledFn({ form, field: mockField })).toBe(false);
    });

    test('should be enabled when gender is not selected', () => {
      const form = createMockForm('');
      const disabledFn = COMPUTED_FIELD_PROPS['dressColor.disabled'];
      
      expect(disabledFn({ form, field: mockField })).toBe(false);
    });
  });

  describe('pantsColor.disabled computation', () => {
    test('should be disabled when gender is female', () => {
      const form = createMockForm('female');
      const disabledFn = COMPUTED_FIELD_PROPS['pantsColor.disabled'];
      
      expect(disabledFn({ form, field: mockField })).toBe(true);
    });

    test('should be enabled when gender is male', () => {
      const form = createMockForm('male');
      const disabledFn = COMPUTED_FIELD_PROPS['pantsColor.disabled'];
      
      expect(disabledFn({ form, field: mockField })).toBe(false);
    });

    test('should be enabled when gender is not selected', () => {
      const form = createMockForm('');
      const disabledFn = COMPUTED_FIELD_PROPS['pantsColor.disabled'];
      
      expect(disabledFn({ form, field: mockField })).toBe(false);
    });
  });

  describe('Dynamic Labels', () => {
    test('dressColor label should change based on gender', () => {
      const labelFn = COMPUTED_FIELD_PROPS['dressColor.label'];
      
      const maleForm = createMockForm('male');
      const femaleForm = createMockForm('female');
      const emptyForm = createMockForm('');
      
      expect(labelFn({ form: maleForm, field: mockField })).toBe('Choose Dress Color (Not Available)');
      expect(labelFn({ form: femaleForm, field: mockField })).toBe('Choose Dress Color');
      expect(labelFn({ form: emptyForm, field: mockField })).toBe('Choose Dress Color');
    });

    test('pantsColor label should change based on gender', () => {
      const labelFn = COMPUTED_FIELD_PROPS['pantsColor.label'];
      
      const maleForm = createMockForm('male');
      const femaleForm = createMockForm('female');
      const emptyForm = createMockForm('');
      
      expect(labelFn({ form: maleForm, field: mockField })).toBe('Choose Pants Color');
      expect(labelFn({ form: femaleForm, field: mockField })).toBe('Choose Pants Color (Not Available)');
      expect(labelFn({ form: emptyForm, field: mockField })).toBe('Choose Pants Color');
    });
  });

  describe('Dynamic Placeholders', () => {
    test('dressColor placeholder should change based on gender', () => {
      const placeholderFn = COMPUTED_FIELD_PROPS['dressColor.placeholder'];
      
      const maleForm = createMockForm('male');
      const femaleForm = createMockForm('female');
      
      expect(placeholderFn({ form: maleForm, field: mockField })).toBe('Not available for males');
      expect(placeholderFn({ form: femaleForm, field: mockField })).toBe('Select dress color');
    });

    test('pantsColor placeholder should change based on gender', () => {
      const placeholderFn = COMPUTED_FIELD_PROPS['pantsColor.placeholder'];
      
      const maleForm = createMockForm('male');
      const femaleForm = createMockForm('female');
      
      expect(placeholderFn({ form: maleForm, field: mockField })).toBe('Select pants color');
      expect(placeholderFn({ form: femaleForm, field: mockField })).toBe('Not available for females');
    });
  });

  describe('Helper Functions', () => {
    test('getComputedDisabled should return correct function', () => {
      const dressColorDisabled = getComputedDisabled('dressColor');
      const pantsColorDisabled = getComputedDisabled('pantsColor');
      
      expect(typeof dressColorDisabled).toBe('function');
      expect(typeof pantsColorDisabled).toBe('function');
      expect(dressColorDisabled).toBe(COMPUTED_FIELD_PROPS['dressColor.disabled']);
      expect(pantsColorDisabled).toBe(COMPUTED_FIELD_PROPS['pantsColor.disabled']);
    });

    test('getComputedLabel should return correct function', () => {
      const dressColorLabel = getComputedLabel('dressColor');
      const pantsColorLabel = getComputedLabel('pantsColor');
      
      expect(typeof dressColorLabel).toBe('function');
      expect(typeof pantsColorLabel).toBe('function');
      expect(dressColorLabel).toBe(COMPUTED_FIELD_PROPS['dressColor.label']);
      expect(pantsColorLabel).toBe(COMPUTED_FIELD_PROPS['pantsColor.label']);
    });

    test('getComputedPlaceholder should return correct function', () => {
      const dressColorPlaceholder = getComputedPlaceholder('dressColor');
      const pantsColorPlaceholder = getComputedPlaceholder('pantsColor');
      
      expect(typeof dressColorPlaceholder).toBe('function');
      expect(typeof pantsColorPlaceholder).toBe('function');
      expect(dressColorPlaceholder).toBe(COMPUTED_FIELD_PROPS['dressColor.placeholder']);
      expect(pantsColorPlaceholder).toBe(COMPUTED_FIELD_PROPS['pantsColor.placeholder']);
    });

    test('helper functions should return undefined for non-existent fields', () => {
      expect(getComputedDisabled('nonExistent')).toBeUndefined();
      expect(getComputedLabel('nonExistent')).toBeUndefined();
      expect(getComputedPlaceholder('nonExistent')).toBeUndefined();
    });
  });

  describe('Real-World Integration', () => {
    test('should work together - dress color disabled for males', () => {
      const maleForm = createMockForm('male');
      
      const disabled = COMPUTED_FIELD_PROPS['dressColor.disabled']({ form: maleForm, field: mockField });
      const label = COMPUTED_FIELD_PROPS['dressColor.label']({ form: maleForm, field: mockField });
      const placeholder = COMPUTED_FIELD_PROPS['dressColor.placeholder']({ form: maleForm, field: mockField });
      
      expect(disabled).toBe(true);
      expect(label).toBe('Choose Dress Color (Not Available)');
      expect(placeholder).toBe('Not available for males');
    });

    test('should work together - pants color disabled for females', () => {
      const femaleForm = createMockForm('female');
      
      const disabled = COMPUTED_FIELD_PROPS['pantsColor.disabled']({ form: femaleForm, field: mockField });
      const label = COMPUTED_FIELD_PROPS['pantsColor.label']({ form: femaleForm, field: mockField });
      const placeholder = COMPUTED_FIELD_PROPS['pantsColor.placeholder']({ form: femaleForm, field: mockField });
      
      expect(disabled).toBe(true);
      expect(label).toBe('Choose Pants Color (Not Available)');
      expect(placeholder).toBe('Not available for females');
    });

    test('should work together - both fields enabled with no gender selection', () => {
      const emptyForm = createMockForm('');
      
      const dressDisabled = COMPUTED_FIELD_PROPS['dressColor.disabled']({ form: emptyForm, field: mockField });
      const pantsDisabled = COMPUTED_FIELD_PROPS['pantsColor.disabled']({ form: emptyForm, field: mockField });
      
      expect(dressDisabled).toBe(false);
      expect(pantsDisabled).toBe(false);
    });
  });
});
