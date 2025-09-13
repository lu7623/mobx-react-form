/**
 * Body Measurement Field Component
 * Simple field with size-based validation for body measurements
 */

import { observer } from 'mobx-react-lite';
import { FormControl } from '@mui/base/FormControl';
import { useField, useFormContext } from '../contexts/FormContext';
import { SIZE_MEASUREMENT_RANGES } from '../config/form-config';

interface BodyMeasurementFieldProps {
    fieldName: string;
    measurementType: 'waist' | 'chest' | 'hips';
}

export const BodyMeasurementField = observer(({
    fieldName,
    measurementType
}: BodyMeasurementFieldProps) => {
    const form = useFormContext();
    const field = useField(fieldName);
    
    const size = form.$('size')?.value || '';
    const range = size ? SIZE_MEASUREMENT_RANGES[size as keyof typeof SIZE_MEASUREMENT_RANGES]?.[measurementType] : null;

    const validateMeasurement = (value: string) => {
        // Skip validation if field is disabled or no size selected
        if (field.disabled || !size || !value) {
            field.resetValidation();
            return;
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            field.invalidate('Please enter a valid number.');
            return;
        }

        // Validate against size-based range
        if (range && (numValue < range.min || numValue > range.max)) {
            field.invalidate(`Must be between ${range.min}-${range.max} cm for size ${size}.`);
        } else {
            field.resetValidation();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.set(e.target.value);
        validateMeasurement(e.target.value);
    };

    return (
        <FormControl className="space-y-2">
            <label className={`block text-sm font-semibold ${
                field.disabled ? 'text-gray-400' : 'text-gray-700'
            }`}>
                {field.label}
                {field.disabled && <span className="ml-2 text-xs text-gray-400">(disabled)</span>}
                {range && !field.disabled && (
                    <span className="ml-2 text-xs text-blue-600 font-normal">
                        ({range.min}-{range.max}cm for size {size})
                    </span>
                )}
            </label>

            <input
                type="number"
                value={field.value}
                placeholder={field.placeholder}
                disabled={field.disabled}
                onChange={handleChange}
                onBlur={() => validateMeasurement(field.value)}
                className={`w-full px-3.5 py-3 text-sm border-2 rounded-lg bg-white outline-none ${
                    field.disabled
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : field.hasError
                        ? 'border-red-600 ring-4 ring-red-50'
                        : 'border-gray-200 hover:border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
                }`}
            />

            {field.hasError && !field.disabled && (
                <div className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5">
                    <span className="text-sm">⚠️</span>
                    <span>{field.error}</span>
                </div>
            )}

            {!field.hasError && range && !field.disabled && (
                <p className="text-xs text-blue-500 mt-1">
                    Recommended range for size {size}: {range.min}-{range.max}cm
                </p>
            )}
        </FormControl>
    );
});