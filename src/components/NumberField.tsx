import { observer } from 'mobx-react-lite';
import { FormControl } from '@mui/base/FormControl';

interface NumberFieldProps {
  field: any;
  fieldName?: string; // Optional for backward compatibility
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const NumberField = observer(({ field, min, max, step, disabled = false }: NumberFieldProps) => {

  return (
    <FormControl className="space-y-2">
      <label className={`block text-sm font-semibold ${
        disabled ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {field.label}
        {disabled && <span className="ml-2 text-xs text-gray-400">(disabled)</span>}
      </label>
      <input
        {...field.bind()}
        type="number"
        min={min}
        max={max}
        step={step || 1}
        placeholder={field.placeholder}
        disabled={disabled}
        className={`w-full px-3.5 py-3 text-sm border-2 rounded-lg bg-white outline-none ${
          disabled
            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
            : field.hasError
            ? 'border-red-600 ring-4 ring-red-50'
            : 'border-gray-200 hover:border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
        }`}
      />
      {field.hasError && !disabled && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs mt-1.5">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
      {field.description && (
        <p className="text-xs text-gray-500 mt-1">
          {field.description}
        </p>
      )}
    </FormControl>
  );
});
