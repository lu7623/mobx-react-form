import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { 
  FIELDS, 
  VALUES, 
  LABELS, 
  PLACEHOLDERS, 
  RULES, 
  DEFAULTS, 
  DISABLED,
  SIZE_MEASUREMENT_RANGES,
  applyFieldDependencies,
  getSizeBasedErrorMessage 
} from './config/form-config';
import type { YarnCalculationResult } from './calculations/yarn-calculations';

// Import validatorjs configuration - this initializes the library automatically
import './config/validatorjs-config';

export default class MyForm extends Form {
  
  constructor() {
    super();
  }

  /*
    DVR plugin setup with custom validators for body measurements
    All validation logic is now centralized in configuration
  */
  plugins() {
    return {
      dvr: dvr({ 
        package: validatorjs,
        extend: ({ validator }) => {
          // Custom validator for waist measurements
          validator.register('bodyMeasurementWaist', (value: string | number | boolean) => {
            return this.validateBodyMeasurement(String(value), 'waist');
          }, 'The waist measurement is invalid for the selected size.');

          // Custom validator for chest measurements  
          validator.register('bodyMeasurementChest', (value: string | number | boolean) => {
            return this.validateBodyMeasurement(String(value), 'chest');
          }, 'The chest measurement is invalid for the selected size.');

          // Custom validator for hips measurements
          validator.register('bodyMeasurementHips', (value: string | number | boolean) => {
            return this.validateBodyMeasurement(String(value), 'hips');
          }, 'The hips measurement is invalid for the selected size.');
        }
      }),
    };
  }

  /*
    Form options to enable validation on change and blur
    strictSelect: false is required for computed properties to access fields before creation
  */
  options() {
    return {
      validateOnChange: true, 
      validateOnBlur: true,
      validateOnInit: false,
      showErrorsOnInit: false,
      showErrorsOnSubmit: true,
      showErrorsOnClear: false,
      strictSelect: false,
      validateTrimmed: true,
      validateDebounced: 500, // Longer debounce to allow typing
    };
  }

  /*
    Return the `fields` as a collection into the `setup()` method
    Fields, validation rules, default values, computed properties,
    and custom validators are all loaded from separate configuration files.
  */
  setup() {
    return {
      fields: FIELDS,
      values: VALUES,
      labels: LABELS,
      placeholders: PLACEHOLDERS,
      rules: RULES,
      defaults: DEFAULTS,
      disabled: DISABLED
    };
  }

  /*
    Reset form to default values
  */
  resetToDefaults() {
    this.reset();
  }

  /*
    Computed property to check if form is ready for yarn calculation
  */
  get isCalculationReady(): boolean {
    return this.isReadyForCalculation().ready;
  }

  /*
    Validate body measurements against size-based ranges
  */
  validateBodyMeasurement(value: string, measurementType: 'waist' | 'chest' | 'hips') {
    // Allow empty values - they're optional
    if (!value || value === '') return true;
    
    const size = this.$('size')?.value;
    // Allow any value if no size is selected yet
    if (!size) return true;
    
    const numValue = parseFloat(value);
    // Must be a valid number
    if (isNaN(numValue)) return false;
    
    // Get the valid range for this size and measurement type
    const range = SIZE_MEASUREMENT_RANGES[size as keyof typeof SIZE_MEASUREMENT_RANGES]?.[measurementType];
    if (!range) return true; // Allow if range not defined
    
    // Check if value is within the valid range
    return numValue >= range.min && numValue <= range.max;
  }

  /*
    Get custom error message for body measurements based on size
  */
  getCustomErrorMessage(fieldName: string) {
    const field = this.$(fieldName);
    const size = this.$('size')?.value;
    const value = parseFloat(field.value);

    // If field has a validation error and we have size + valid value, provide custom message
    if (field.hasError && size && !isNaN(value) && fieldName.startsWith('bodyMeasurements.')) {
      return getSizeBasedErrorMessage(fieldName, size, value);
    }
    
    return field.error; // Return default error
  }

  /*
    Check if form has all required values for yarn calculation
  */
  isReadyForCalculation(): { ready: boolean; errors: string[] } {
    const errors: string[] = [];
    
    const yarnLength = parseFloat(this.$('yarnLength').value);
    const itemType = this.$('itemType').value;
    const length = parseFloat(this.$('length').value);
    const waist = parseFloat(this.$('bodyMeasurements.waist').value);
    const chest = parseFloat(this.$('bodyMeasurements.chest').value);  
    const hips = parseFloat(this.$('bodyMeasurements.hips').value);
    const sleevesLength = this.$('sleevesLength').value;

    if (!yarnLength || yarnLength <= 0) {
      errors.push('Yarn length must be greater than 0');
    }
    
    if (!itemType) {
      errors.push('Item type is required');
    }
    
    if (itemType === 'scarf' && (!length || length <= 0)) {
      errors.push('Length is required for scarfs');
    }
    
    if (['sweater', 'dress'].includes(itemType)) {
      if (!waist || waist <= 0) {
        errors.push('Waist measurement is required for sweaters and dresses');
      }
      if (!chest || chest <= 0) {
        errors.push('Chest measurement is required for sweaters and dresses');
      }
      if (!hips || hips <= 0) {
        errors.push('Hips measurement is required for sweaters and dresses');
      }
    }
    
    if (itemType === 'dress' && !sleevesLength) {
      errors.push('Sleeves length is required for dresses');
    }
    
    return {
      ready: errors.length === 0,
      errors
    };
  }

  /*
    Calculate yarn requirements based on current form values
  */
  calculateYarnRequirements(): YarnCalculationResult {
    const yarnLength = parseFloat(this.$('yarnLength').value);
    const itemType = this.$('itemType').value;
    const length = parseFloat(this.$('length').value);
    const waist = parseFloat(this.$('bodyMeasurements.waist').value);
    const chest = parseFloat(this.$('bodyMeasurements.chest').value);
    const hips = parseFloat(this.$('bodyMeasurements.hips').value);
    const sleevesLength = this.$('sleevesLength').value;
    
    // Check if ready for calculation
    const readiness = this.isReadyForCalculation();
    if (!readiness.ready) {
      throw new Error(readiness.errors.join(', '));
    }

    let totalYarn = 0;
    let formula = '';

    switch (itemType) {
      case 'scarf':
        totalYarn = (length * 100 * 3) / yarnLength;
        formula = `(${length} × 100 × 3) ÷ ${yarnLength} = ${totalYarn.toFixed(2)}`;
        break;

      case 'sweater':
        const sweaterSum = waist + chest + hips;
        totalYarn = (sweaterSum * 100 * 12) / (3 * yarnLength);
        formula = `((${waist} + ${chest} + ${hips}) × 100 × 12) ÷ (3 × ${yarnLength}) = ${totalYarn.toFixed(2)}`;
        break;

      case 'dress':
        const dressSum = waist + chest + hips;
        const multiplier = sleevesLength === 'short' ? 30 : 40;
        totalYarn = (dressSum * 100 * multiplier) / (3 * yarnLength);
        formula = `((${waist} + ${chest} + ${hips}) × 100 × ${multiplier}) ÷ (3 × ${yarnLength}) = ${totalYarn.toFixed(2)}`;
        break;

      default:
        throw new Error(`Unsupported item type: ${itemType}`);
    }

    // Calculate number of yarn packs (each pack is 50g)
    const yarnPacks = Math.ceil(totalYarn / 50);

    return {
      totalYarn: Math.round(totalYarn * 100) / 100, // Round to 2 decimal places
      yarnPacks,
      itemType,
      formula
    };
  }

  /*
    Event Hooks
  */
  hooks() {
    return {
      onSuccess: (form: Form) => {
        console.log('Form is valid!', form.values());
        // Calculation is now handled in the UI component
      },
      onError: (form: Form) => {
        alert('Form has errors!');
        console.log('All form errors', form.errors());
      },
      onChange: (form: Form) => {
        // Apply field dependencies based on current form state
        applyFieldDependencies(form);
      },
    };
  }
}