import { FormControl } from '@mui/base/FormControl';
import { FIELD_DISPLAY } from '../config';
import type { RadioInputElementProps } from '../types/InputElementTypes';

interface RadioFieldProps extends RadioInputElementProps {
  // Additional props specific to RadioField can be added here
}

export const RadioField = ({ field, fieldName }: RadioFieldProps) => {
  const displayConfig = FIELD_DISPLAY[fieldName];
  const options = 'options' in displayConfig ? displayConfig.options : [];

  return (
    <FormControl className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {field.label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name={fieldName}
              value={option.value}
              checked={field.value === option.value}
              onChange={(e) => field.set(e.target.value)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {field.hasError && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
    </FormControl>
  );
};