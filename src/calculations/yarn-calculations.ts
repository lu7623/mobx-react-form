/**
 * Yarn Calculation Logic for Different Item Types
 * Calculates total yarn needed and number of yarn packs required
 */

export interface YarnCalculationResult {
  totalYarn: number;
  yarnPacks: number;
  itemType: string;
  formula: string; // For debugging/display purposes
}

export interface FormValues {
  yarnLength: number;
  itemType: string;
  length?: number;
  sleevesLength?: string;
  bodyMeasurements?: {
    waist: number;
    chest: number;
    hips: number;
  };
}

/**
 * Calculate total yarn and packs needed based on item type and measurements
 */
export const calculateYarnRequirements = (values: FormValues): YarnCalculationResult => {
  const { yarnLength, itemType, length, sleevesLength, bodyMeasurements } = values;
  
  let totalYarn = 0;
  let formula = '';

  switch (itemType) {
    case 'scarf':
      if (!length) {
        throw new Error('Length is required for scarf calculations');
      }
      totalYarn = (length * 100 * 3) / yarnLength;
      formula = `(${length} × 100 × 3) ÷ ${yarnLength} = ${totalYarn.toFixed(2)}`;
      break;

    case 'sweater':
      if (!bodyMeasurements?.waist || !bodyMeasurements?.chest || !bodyMeasurements?.hips) {
        throw new Error('Body measurements (waist, chest, hips) are required for sweater calculations');
      }
      const sweaterSum = bodyMeasurements.waist + bodyMeasurements.chest + bodyMeasurements.hips;
      totalYarn = (sweaterSum * 100 * 12) / (3 * yarnLength);
      formula = `((${bodyMeasurements.waist} + ${bodyMeasurements.chest} + ${bodyMeasurements.hips}) × 100 × 12) ÷ (3 × ${yarnLength}) = ${totalYarn.toFixed(2)}`;
      break;

    case 'dress':
      if (!bodyMeasurements?.waist || !bodyMeasurements?.chest || !bodyMeasurements?.hips) {
        throw new Error('Body measurements (waist, chest, hips) are required for dress calculations');
      }
      if (!sleevesLength) {
        throw new Error('Sleeves length is required for dress calculations');
      }
      
      const dressSum = bodyMeasurements.waist + bodyMeasurements.chest + bodyMeasurements.hips;
      const multiplier = sleevesLength === 'short' ? 30 : 40;
      totalYarn = (dressSum * 100 * multiplier) / (3 * yarnLength);
      formula = `((${bodyMeasurements.waist} + ${bodyMeasurements.chest} + ${bodyMeasurements.hips}) × 100 × ${multiplier}) ÷ (3 × ${yarnLength}) = ${totalYarn.toFixed(2)}`;
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
};

/**
 * Format calculation results for display
 */
export const formatYarnResults = (result: YarnCalculationResult): string => {
  return `
Total Yarn: ${result.totalYarn}g
Packs Needed: ${result.yarnPacks} packs (50g each)
Item Type: ${result.itemType}
Formula: ${result.formula}
  `.trim();
};

/**
 * Validate that all required fields for calculation are present
 */
export const validateCalculationInputs = (values: FormValues): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!values.yarnLength || values.yarnLength <= 0) {
    errors.push('Yarn length must be greater than 0');
  }
  
  if (!values.itemType) {
    errors.push('Item type is required');
  }
  
  if (values.itemType === 'scarf' && (!values.length || values.length <= 0)) {
    errors.push('Length is required for scarfs');
  }
  
  if (['sweater', 'dress'].includes(values.itemType)) {
    if (!values.bodyMeasurements?.waist || values.bodyMeasurements.waist <= 0) {
      errors.push('Waist measurement is required for sweaters and dresses');
    }
    if (!values.bodyMeasurements?.chest || values.bodyMeasurements.chest <= 0) {
      errors.push('Chest measurement is required for sweaters and dresses');
    }
    if (!values.bodyMeasurements?.hips || values.bodyMeasurements.hips <= 0) {
      errors.push('Hips measurement is required for sweaters and dresses');
    }
  }
  
  if (values.itemType === 'dress' && !values.sleevesLength) {
    errors.push('Sleeves length is required for dresses');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
