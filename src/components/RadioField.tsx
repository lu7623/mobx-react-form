import { observer } from 'mobx-react-lite';
import { FormControl } from '@mui/base/FormControl';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioFieldProps {
  field: any;
  fieldName?: string; // Optional for backward compatibility
  options: RadioOption[];
  disabled?: boolean;
}

export const RadioField = observer(({ field, options, disabled = false }: RadioFieldProps) => {

  return (
    <FormControl className="space-y-2">
      <label className={`block text-sm font-semibold ${
        disabled ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {field.label}
        {disabled && <span className="ml-2 text-xs text-gray-400">(disabled)</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className={`flex items-center space-x-3 group ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}>
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={field.value === option.value}
              onChange={(e) => field.set(e.target.value)}
              disabled={disabled}
              className={`w-4 h-4 border-gray-300 focus:ring-2 ${
                disabled 
                  ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                  : 'text-primary-600 focus:ring-primary-500'
              }`}
            />
            <span className={`text-sm transition-colors ${
              disabled 
                ? 'text-gray-400'
                : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {field.hasError && !disabled && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
    </FormControl>
  );
});