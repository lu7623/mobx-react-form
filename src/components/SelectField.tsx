import { FormControl } from '@mui/base/FormControl';
import { FIELD_DISPLAY } from '../config';
import type { SelectInputElementProps } from '../types/InputElementTypes';

interface SelectFieldProps extends SelectInputElementProps {
  // Additional props specific to SelectField can be added here
}

export const SelectField = ({ field, fieldName, disabled = false }: SelectFieldProps) => {
  const displayConfig = FIELD_DISPLAY[fieldName];
  const options = 'options' in displayConfig ? displayConfig.options : [];
  
  // Use native HTML select for better compatibility with mobx-react-form
  const fieldBind = field.bind();

  return (
    <FormControl className="space-y-2">
      <label className={`block text-sm font-semibold ${
        disabled ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {field.label}
        {disabled && <span className="ml-2 text-xs text-gray-400">(disabled)</span>}
      </label>
      <select
        {...fieldBind}
        disabled={disabled}
               className={`w-full px-3.5 py-3 text-sm border-2 rounded-lg bg-white outline-none ${
                 disabled
                   ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                   : field.hasError
                   ? 'border-red-600 ring-4 ring-red-50'
                   : 'border-gray-200 hover:border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
               } appearance-none`}
        style={{
          backgroundImage: disabled 
            ? 'none' 
            : `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 12px center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '16px',
        }}
      >
        <option value="" disabled>
          {field.placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {field.hasError && !disabled && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
    </FormControl>
  );
};
