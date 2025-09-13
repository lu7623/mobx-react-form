/**
 * Tests for Yarn Calculations MyForm Class
 * Testing mobx-react-form implementation with yarn calculation fields
 */

import { describe, beforeEach, test, expect } from 'vitest';
import MyForm from './Form';

describe('Yarn Calculations MyForm Tests', () => {
  let form: MyForm;

  beforeEach(() => {
    form = new MyForm();
  });

  describe('Form Structure', () => {
    test('should initialize with correct field count for yarn form', () => {
      // Note: dot notation creates nested fields, so actual field count is different
      expect(form.size).toBe(6);
    });

    test('should have all required yarn calculation fields', () => {
      expect(form.has('yarnLength')).toBe(true);
      expect(form.has('itemType')).toBe(true);
      expect(form.has('length')).toBe(true);
      expect(form.has('size')).toBe(true);
      expect(form.has('sleevesLength')).toBe(true);
      // Body measurements are created as nested fields via dot notation
      expect(form.$('bodyMeasurements.waist')).toBeDefined();
      expect(form.$('bodyMeasurements.chest')).toBeDefined();
      expect(form.$('bodyMeasurements.hips')).toBeDefined();
    });

    test('should have correct initial values for yarn fields', () => {
      expect(form.$('yarnLength').value).toBe('400');
      expect(form.$('itemType').value).toBe('scarf');
      expect(form.$('length').value).toBe('120');
      expect(form.$('size').value).toBe('');
      expect(form.$('sleevesLength').value).toBe('');
    });
  });

  describe('Form Configuration', () => {
    test('should have correct validation options configured', () => {
      const options = form.options();
      expect(options.validateOnChange).toBe(true);
      expect(options.validateOnBlur).toBe(true);
      expect(options.showErrorsOnInit).toBe(false);
    });

    test('should have DVR plugin configured', () => {
      const plugins = form.plugins();
      expect(plugins).toHaveProperty('dvr');
      expect(typeof plugins.dvr).toBe('object');
    });

    test('should have correct field rules for yarn fields', () => {
      expect(form.$('yarnLength').rules).toBe('required|numeric|min:50|max:800');
      expect(form.$('itemType').rules).toBe('required|in:scarf,sweater,dress');
      expect(form.$('length').rules).toBe('numeric|min:10|max:300');
      expect(form.$('size').rules).toBe('string|in:S,M,L,XL');
      expect(form.$('sleevesLength').rules).toBe('string|in:short,long');
    });

    test('should have correct field labels for yarn fields', () => {
      expect(form.$('yarnLength').label).toBe('Yarn Length per 100g');
      expect(form.$('itemType').label).toBe('Item Type');
      expect(form.$('length').label).toBe('Length'); // Will be computed based on item type
      expect(form.$('size').label).toBe('Size'); // Will be computed based on item type
      expect(form.$('sleevesLength').label).toBe('Sleeves Length'); // Will be computed based on item type
    });

    test('should have correct field placeholders for yarn fields', () => {
      expect(form.$('yarnLength').placeholder).toBe('Enter yarn length in meters');
      expect(form.$('itemType').placeholder).toBe('Select item type');
      expect(form.$('length').placeholder).toBe('Enter length in cm');
      expect(form.$('size').placeholder).toBe('Select size');
      expect(form.$('sleevesLength').placeholder).toBe('Select sleeves length');
    });
  });


  describe('Form Hooks', () => {
    test('should have onSuccess hook', () => {
      const hooks = form.hooks();
      expect(hooks).toHaveProperty('onSuccess');
      expect(typeof hooks.onSuccess).toBe('function');
    });

    test('should have onError hook', () => {
      const hooks = form.hooks();
      expect(hooks).toHaveProperty('onError');
      expect(typeof hooks.onError).toBe('function');
    });
  });

  describe('Form Methods', () => {
    test('should be able to set yarn calculation field values', () => {
      form.$('yarnLength').set('150');
      form.$('itemType').set('scarf');
      form.$('length').set('180');

      expect(form.$('yarnLength').value).toBe('150');
      expect(form.$('itemType').value).toBe('scarf');
      expect(form.$('length').value).toBe('180');
    });

    test('should be able to clear yarn form', () => {
      // Set some values first
      form.$('yarnLength').set('150');
      form.$('itemType').set('scarf');
      form.$('length').set('180');

      // Clear the form
      form.clear();

      // Check all fields are cleared
      expect(form.$('yarnLength').value).toBe('');
      expect(form.$('itemType').value).toBe('');
      expect(form.$('length').value).toBe('');
      expect(form.$('size').value).toBe('');
      expect(form.$('sleevesLength').value).toBe('');
    });

    test('should have validate method', () => {
      expect(typeof form.validate).toBe('function');
    });

    test('should have values method returning yarn calculation values', () => {
      expect(typeof form.values).toBe('function');
      const values = form.values();
      expect(values).toHaveProperty('yarnLength');
      expect(values).toHaveProperty('itemType');
      expect(values).toHaveProperty('length');
      expect(values).toHaveProperty('size');
      expect(values).toHaveProperty('sleevesLength');
    });

    test('should have errors method', () => {
      expect(typeof form.errors).toBe('function');
      const errors = form.errors();
      expect(typeof errors).toBe('object');
    });
  });

  describe('Validation Tests', () => {
    test('should validate yarn length field correctly', () => {
      // Test required validation
      form.$('yarnLength').set('');
      form.validate();
      expect(form.$('yarnLength').hasError).toBe(true);

      // Test minimum value
      form.$('yarnLength').set('30');
      form.validate();
      expect(form.$('yarnLength').hasError).toBe(true);

      // Test maximum value
      form.$('yarnLength').set('3000');
      form.validate();
      expect(form.$('yarnLength').hasError).toBe(true);

      // Test valid value
      form.$('yarnLength').set('150');
      form.validate();
      expect(form.$('yarnLength').hasError).toBe(false);
    });

    test('should validate item type field correctly', () => {
      // Test required validation
      form.$('itemType').set('');
      form.validate();
      expect(form.$('itemType').hasError).toBe(true);

      // Test invalid value
      form.$('itemType').set('invalid');
      form.validate();
      expect(form.$('itemType').hasError).toBe(true);

      // Test valid values
      ['scarf', 'sweater', 'dress'].forEach(itemType => {
        form.$('itemType').set(itemType);
        form.validate();
        expect(form.$('itemType').hasError).toBe(false);
      });
    });

    test('should validate length field correctly (when enabled)', () => {
      // Enable length field by selecting scarf
      form.$('itemType').set('scarf');

      // Test minimum value
      form.$('length').set('5');
      form.validate();
      expect(form.$('length').hasError).toBe(true);

      // Test maximum value
      form.$('length').set('500');
      form.validate();
      expect(form.$('length').hasError).toBe(true);

      // Test valid value
      form.$('length').set('180');
      form.validate();
      expect(form.$('length').hasError).toBe(false);

      // Test empty value (should be valid since not required)
      form.$('length').set('');
      form.validate();
      expect(form.$('length').hasError).toBe(false);
    });

    test('should validate size field correctly (when enabled)', () => {
      // Enable size field by selecting sweater
      form.$('itemType').set('sweater');

      // Test invalid value
      form.$('size').set('invalid');
      form.validate();
      expect(form.$('size').hasError).toBe(true);

      // Test valid values
      ['S', 'M', 'L', 'XL'].forEach(size => {
        form.$('size').set(size);
        form.validate();
        expect(form.$('size').hasError).toBe(false);
      });

      // Test empty value (should be valid since not required)
      form.$('size').set('');
      form.validate();
      expect(form.$('size').hasError).toBe(false);
    });

    test('should validate sleeves length field correctly (when enabled)', () => {
      // Enable sleeves field by selecting dress
      form.$('itemType').set('dress');

      // Test invalid value
      form.$('sleevesLength').set('invalid');
      form.validate();
      expect(form.$('sleevesLength').hasError).toBe(true);

      // Test valid values
      ['short', 'long'].forEach(sleeves => {
        form.$('sleevesLength').set(sleeves);
        form.validate();
        expect(form.$('sleevesLength').hasError).toBe(false);
      });

      // Test empty value (should be valid since not required)
      form.$('sleevesLength').set('');
      form.validate();
      expect(form.$('sleevesLength').hasError).toBe(false);
    });

    test('form should be valid with complete yarn calculation data', () => {
      // Set required fields
      form.$('yarnLength').set('150');
      form.$('itemType').set('scarf');
      form.$('length').set('180'); // Valid for scarf

      form.validate();

      expect(form.isValid).toBe(true);
      expect(form.hasError).toBe(false);
    });

    test('form should be invalid without required fields', () => {
      // Leave required fields empty
      form.$('yarnLength').set('');
      form.$('itemType').set('');

      form.validate();

      expect(form.isValid).toBe(false);
      expect(form.hasError).toBe(true);
    });
  });

  describe('Real-World Yarn Calculation Scenarios', () => {
    test('scarf calculation scenario', () => {
      form.$('yarnLength').set('200');
      form.$('itemType').set('scarf');
      form.$('length').set('150');

      form.validate();

      expect(form.isValid).toBe(true);
    });

    test('sweater calculation scenario', () => {
      form.$('yarnLength').set('300');
      form.$('itemType').set('sweater');
      form.$('size').set('M');

      form.validate();

      expect(form.isValid).toBe(true);
    });

    test('dress calculation scenario', () => {
      form.$('yarnLength').set('400');
      form.$('itemType').set('dress');
      form.$('size').set('L');
      form.$('sleevesLength').set('long');

      form.validate();

      expect(form.isValid).toBe(true);
    });
  });
});