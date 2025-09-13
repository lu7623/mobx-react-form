import { Input } from '@mui/base/Input';
import { FormControl } from '@mui/base/FormControl';
import { FIELD_DISPLAY } from '../config';
import type { TextInputElementProps } from '../types/InputElementTypes';

interface NumberFieldProps extends Omit<TextInputElementProps, 'type'> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField = ({ field, fieldName, min, max, step }: NumberFieldProps) => {
  const displayConfig = FIELD_DISPLAY[fieldName];

  return (
    <FormControl className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {field.label}
      </label>
      <Input
        {...field.bind()}
        slotProps={{
          input: {
            className: `w-full px-3.5 py-3 text-sm border-2 rounded-lg bg-white outline-none ${
              field.hasError
                ? 'border-red-600 ring-4 ring-red-50'
                : 'border-gray-200 hover:border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
            }`,
            type: 'number',
            min: min || (displayConfig && 'min' in displayConfig ? displayConfig.min : undefined),
            max: max || (displayConfig && 'max' in displayConfig ? displayConfig.max : undefined),
            step: step || (displayConfig && 'step' in displayConfig ? displayConfig.step : undefined),
            placeholder: field.placeholder,
          },
        }}
      />
      {field.hasError && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
      {displayConfig && 'description' in displayConfig && displayConfig.description && (
        <p className="text-xs text-gray-500 mt-1">
          {displayConfig.description}
        </p>
      )}
    </FormControl>
  );
};
