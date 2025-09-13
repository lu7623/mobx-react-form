/**
 * Computed Fields Configuration
 * Using mobx-react-form's native computed props functionality
 * Based on: https://foxhound87.github.io/mobx-react-form/docs/extra/computed-props.html
 */

/**
 * Computed field properties using mobx-react-form's built-in computed functionality
 * The function receives { form, field } as parameters
 */
export const COMPUTED_FIELD_PROPS = {
  // Dress color is disabled when gender is 'male'
  'dressColor.disabled': ({ form }: { form: any; field: any }) => {
    return form.$('gender')?.value === 'male';
  },

  // Pants color is disabled when gender is 'female'  
  'pantsColor.disabled': ({ form }: { form: any; field: any }) => {
    return form.$('gender')?.value === 'female';
  },

  // Optional: Dynamic labels based on gender selection
  'dressColor.label': ({ form }: { form: any; field: any }) => {
    const gender = form.$('gender')?.value;
    return gender === 'male' 
      ? 'Choose Dress Color (Not Available)' 
      : 'Choose Dress Color';
  },

  'pantsColor.label': ({ form }: { form: any; field: any }) => {
    const gender = form.$('gender')?.value;
    return gender === 'female' 
      ? 'Choose Pants Color (Not Available)' 
      : 'Choose Pants Color';
  },

  // Optional: Dynamic placeholder text
  'dressColor.placeholder': ({ form }: { form: any; field: any }) => {
    const gender = form.$('gender')?.value;
    return gender === 'male' 
      ? 'Not available for males' 
      : 'Select dress color';
  },

  'pantsColor.placeholder': ({ form }: { form: any; field: any }) => {
    const gender = form.$('gender')?.value;
    return gender === 'female' 
      ? 'Not available for females' 
      : 'Select pants color';
  }
};

/**
 * Helper function to extract computed disabled state
 */
export const getComputedDisabled = (fieldName: string) => {
  const key = `${fieldName}.disabled`;
  return COMPUTED_FIELD_PROPS[key as keyof typeof COMPUTED_FIELD_PROPS];
};

/**
 * Helper function to extract computed label
 */
export const getComputedLabel = (fieldName: string) => {
  const key = `${fieldName}.label`;
  return COMPUTED_FIELD_PROPS[key as keyof typeof COMPUTED_FIELD_PROPS];
};

/**
 * Helper function to extract computed placeholder
 */
export const getComputedPlaceholder = (fieldName: string) => {
  const key = `${fieldName}.placeholder`;
  return COMPUTED_FIELD_PROPS[key as keyof typeof COMPUTED_FIELD_PROPS];
};
