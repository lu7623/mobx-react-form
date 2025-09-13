/**
 * Simplified Form Configuration using mobx-react-form Separated Properties
 * Based on: https://foxhound87.github.io/mobx-react-form/docs/fields/defining-flat-fields/separated-properties.html
 */

// Simple field names array
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

// Initial values
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

// Field labels
export const LABELS = {
  yarnLength: 'Yarn Length per 100g',
  itemType: 'Item Type',
  length: 'Length',
  size: 'Size', 
  sleevesLength: 'Sleeves Length',
  'bodyMeasurements.waist': 'Waist',
  'bodyMeasurements.chest': 'Chest',
  'bodyMeasurements.hips': 'Hips'
};

// Field placeholders
export const PLACEHOLDERS = {
  yarnLength: 'Enter yarn length in meters',
  itemType: 'Select item type',
  length: 'Enter length in cm',
  size: 'Select size',
  sleevesLength: 'Select sleeves length', 
  'bodyMeasurements.waist': 'Enter waist measurement in cm',
  'bodyMeasurements.chest': 'Enter chest measurement in cm',
  'bodyMeasurements.hips': 'Enter hips measurement in cm'
};

// Validation rules (DVR - Declarative Validation Rules)
export const RULES = {
  yarnLength: 'required|numeric|min:50|max:800',
  itemType: 'required|in:scarf,sweater,dress',
  length: 'numeric|min:10|max:300',
  size: 'string|in:S,M,L,XL',
  sleevesLength: 'string|in:short,long',
  'bodyMeasurements.waist': 'numeric|min:40|max:180',
  'bodyMeasurements.chest': 'numeric|min:50|max:200',
  'bodyMeasurements.hips': 'numeric|min:60|max:220'
};

// Default values (used on form reset)
export const DEFAULTS = {
  yarnLength: '400',
  itemType: 'scarf', 
  length: '120',
  size: '',
  sleevesLength: '',
  'bodyMeasurements.waist': '',
  'bodyMeasurements.chest': '',
  'bodyMeasurements.hips': ''
};

// Computed disabled fields
export const DISABLED = {
  size: ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType === 'scarf';
  },
  sleevesLength: ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType !== 'dress';
  },
  length: ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType !== 'scarf';
  },
  // Body measurements - disabled for scarfs (no body fitting required)
  'bodyMeasurements.waist': ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType === 'scarf';
  },
  'bodyMeasurements.chest': ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType === 'scarf';
  },
  'bodyMeasurements.hips': ({ form }: { form: any }) => {
    const itemType = form.$('itemType')?.value;
    return itemType === 'scarf';
  }
};
