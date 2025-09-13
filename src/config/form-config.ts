/**
 * Simplified Form Configuration using mobx-react-form Separated Properties
 * Based on: https://foxhound87.github.io/mobx-react-form/docs/fields/defining-flat-fields/separated-properties.html
 */

// Simple field names array (validatorjs supports dotted notation)
export const FIELDS = [
  'yarnLength',
  'itemType', 
  'length',
  'size',
  'sleevesLength',
  'bodyMeasurements.waist',
  'bodyMeasurements.chest', 
  'bodyMeasurements.hips'
];

// Initial values (validatorjs flattened key names)
export const VALUES = {
  yarnLength: '400',
  itemType: 'scarf',
  length: '120',
  size: '',
  sleevesLength: '',
  'bodyMeasurements.waist': '',
  'bodyMeasurements.chest': '',
  'bodyMeasurements.hips': ''
};

// Field labels with nested structure
export const LABELS = {
  yarnLength: 'Yarn Length per 100g',
  itemType: 'Item Type',
  length: 'Length',
  size: 'Size', 
  sleevesLength: 'Sleeves Length',
  bodyMeasurements: {
    waist: 'Waist',
    chest: 'Chest',
    hips: 'Hips'
  }
};

// Field placeholders with nested structure
export const PLACEHOLDERS = {
  yarnLength: 'Enter yarn length in meters',
  itemType: 'Select item type',
  length: 'Enter length in cm',
  size: 'Select size',
  sleevesLength: 'Select sleeves length',
  bodyMeasurements: {
    waist: 'Enter waist measurement in cm',
    chest: 'Enter chest measurement in cm',
    hips: 'Enter hips measurement in cm'
  }
};

// Size-based body measurement ranges (in cm)
export const SIZE_MEASUREMENT_RANGES = {
  S: {
    waist: { min: 60, max: 75 },
    chest: { min: 80, max: 95 },
    hips: { min: 85, max: 100 }
  },
  M: {
    waist: { min: 70, max: 85 },
    chest: { min: 90, max: 105 },
    hips: { min: 95, max: 110 }
  },
  L: {
    waist: { min: 80, max: 95 },
    chest: { min: 100, max: 115 },
    hips: { min: 105, max: 120 }
  },
  XL: {
    waist: { min: 90, max: 110 },
    chest: { min: 110, max: 130 },
    hips: { min: 115, max: 135 }
  }
};

// Note: Body measurement validators are now registered via DVR extend callback in Form.ts
// The validators use the DVR (Declarative Validation Rules) pattern with validatorjs

// Basic validation rules (DVR - Declarative Validation Rules)
export const RULES = {
  yarnLength: 'required|numeric|min:50|max:800',
  itemType: 'required|in:scarf,sweater,dress',
  length: 'numeric|min:10|max:300',
  size: 'string|in:S,M,L,XL',
  sleevesLength: 'string|in:short,long', // Will be auto-set for sweater, user input for dress
  // Body measurements use field-level validation in components
  'bodyMeasurements.waist': 'numeric',
  'bodyMeasurements.chest': 'numeric',
  'bodyMeasurements.hips': 'numeric'
};

// Default values (used on form reset) with nested structure
export const DEFAULTS = {
  yarnLength: '400',
  itemType: 'scarf', 
  length: '120',
  size: '',
  sleevesLength: '',
  bodyMeasurements: {
    waist: '',
    chest: '',
    hips: ''
  }
};

// Computed disabled fields with nested structure
export const DISABLED = {
  size: ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType === 'scarf';
  },
  sleevesLength: ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType !== 'dress'; // Disabled for scarf and sweater
  },
  length: ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType !== 'scarf';
  },
  // Body measurements - disabled for scarfs (no body fitting required)
  bodyMeasurements: {
    waist: ({ form }: { form: any }) => {
      const itemType = form.$('itemType')?.value;
      return itemType === 'scarf';
    },
    chest: ({ form }: { form: any }) => {
      const itemType = form.$('itemType')?.value;
      return itemType === 'scarf';
    },
    hips: ({ form }: { form: any }) => {
      const itemType = form.$('itemType')?.value;
      return itemType === 'scarf';
    }
  }
};

// Field Dependencies Configuration
// When a field changes, automatically update dependent fields based on rules
export const FIELD_DEPENDENCIES = {
  // When itemType changes, update these dependent fields
  itemType: [
    {
      targetField: 'sleevesLength',
      rules: {
        'sweater': 'long',      // sweater -> set sleevesLength to 'long'
        'scarf': '',           // scarf -> clear sleevesLength
        'dress': null          // dress -> keep user input (don't auto-set)
      }
    },
    {
      targetField: 'length',
      rules: {
        'scarf': null,         // scarf -> keep user input (don't auto-set)
        'sweater': '',         // sweater -> clear length  
        'dress': ''            // dress -> clear length
      }
    }
  ],
};

// Helper function to apply field dependencies based on current form state
// Note: Disabled states are automatically handled by mobx-react-form through the DISABLED configuration
export const applyFieldDependencies = (form: any) => {
  // Apply field value dependencies
  Object.entries(FIELD_DEPENDENCIES).forEach(([sourceField, dependencies]) => {
    const sourceFieldObj = form.$(sourceField);
    if (!sourceFieldObj) return;
    
    const currentValue = sourceFieldObj.value;
    
    // Apply dependencies for this source field
    dependencies.forEach((dependency) => {
      const { targetField, rules } = dependency;
      const targetFieldObj = form.$(targetField);
      
      if (!targetFieldObj) return;
      
      // Check if we have a rule for the current value
      if (currentValue in rules) {
        const ruleValue = rules[currentValue as keyof typeof rules];
        
        // null means don't auto-set (keep user input)
        if (ruleValue !== null && targetFieldObj.value !== ruleValue) {
          targetFieldObj.set(ruleValue);
          targetFieldObj.resetValidation();
        }
      }
    });
  });
};

// Get size-based error message for body measurements
export const getSizeBasedErrorMessage = (fieldName: string, size: string, value: number) => {
  const measurementType = fieldName.split('.')[1]; // Extract 'waist', 'chest', or 'hips'
  const range = SIZE_MEASUREMENT_RANGES[size as keyof typeof SIZE_MEASUREMENT_RANGES]?.[measurementType as keyof (typeof SIZE_MEASUREMENT_RANGES)['S']];
  
  if (!range) return `${measurementType} measurement is invalid.`;
  
  if (value < range.min) {
    return `${measurementType.charAt(0).toUpperCase() + measurementType.slice(1)} measurement for size ${size} must be at least ${range.min}cm.`;
  }
  
  if (value > range.max) {
    return `${measurementType.charAt(0).toUpperCase() + measurementType.slice(1)} measurement for size ${size} cannot exceed ${range.max}cm.`;
  }
  
  return `${measurementType} measurement is invalid.`;
};
