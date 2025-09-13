/**
 * Form Field Definitions
 * Contains field configurations including labels, placeholders, and default values
 */

export interface FieldDefinition {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  rules: string;
}

export const FORM_FIELDS: FieldDefinition[] = [
  {
    name: 'yarnLength',
    label: 'Yarn Length per 100g',
    placeholder: 'Enter yarn length in meters',
    value: '400',
    rules: 'required|numeric|min:50|max:2000'
  },
  {
    name: 'itemType',
    label: 'Item Type',
    placeholder: 'Select item type',
    rules: 'required|in:scarf,sweater,dress',
    value: 'scarf'
  },
  {
    name: 'length',
    label: 'Length',
    placeholder: 'Enter length in cm',
    rules: 'numeric|min:10|max:300',
    value: '120'
  },
  {
    name: 'size',
    label: 'Size',
    placeholder: 'Select size',
    rules: 'string|in:S,M,L,XL',
    value: ''
  },
  {
    name: 'sleevesLength',
    label: 'Sleeves Length',
    placeholder: 'Select sleeves length',
    rules: 'string|in:short,long',
    value: ''
  }
];

/**
 * Get field configuration by name
 */
export const getFieldConfig = (fieldName: string): FieldDefinition | undefined => {
  return FORM_FIELDS.find(field => field.name === fieldName);
};

/**
 * Get all field names
 */
export const getFieldNames = (): string[] => {
  return FORM_FIELDS.map(field => field.name);
};

/**
 * Field display configuration
 */
export const FIELD_DISPLAY = {
  yarnLength: {
    type: 'number',
    autoComplete: 'off',
    description: 'Enter the length of yarn per 100g in meters (50-2000m)',
    step: 10,
    min: 50,
    max: 2000
  },
  itemType: {
    type: 'select',
    autoComplete: 'off',
    description: 'Select the type of item you want to create',
    options: [
      { value: 'scarf', label: 'Scarf' },
      { value: 'sweater', label: 'Sweater' },
      { value: 'dress', label: 'Dress' }
    ]
  },
  length: {
    type: 'number',
    autoComplete: 'off',
    description: 'Enter the desired length in centimeters',
    step: 5,
    min: 10,
    max: 300
  },
  size: {
    type: 'select',
    autoComplete: 'off',
    description: 'Select the size for your garment',
    options: [
      { value: 'S', label: 'Small (S)' },
      { value: 'M', label: 'Medium (M)' },
      { value: 'L', label: 'Large (L)' },
      { value: 'XL', label: 'Extra Large (XL)' }
    ]
  },
  sleevesLength: {
    type: 'radio',
    autoComplete: 'off',
    description: 'Choose the length of sleeves',
    options: [
      { value: 'short', label: 'Short Sleeves' },
      { value: 'long', label: 'Long Sleeves' }
    ]
  }
} as const;

export type FieldName = keyof typeof FIELD_DISPLAY;
