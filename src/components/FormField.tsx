import { Input } from '@mui/base/Input';
import { FormControl } from '@mui/base/FormControl';
import { FIELD_DISPLAY } from '../config';
import type { TextInputElementProps } from '../types/InputElementTypes';

interface FormFieldProps extends Omit<TextInputElementProps, 'type'> {
  // Additional props specific to FormField can be added here
}

export const FormField = ({ field, fieldName }: FormFieldProps) => {
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
            type: displayConfig && 'type' in displayConfig ? displayConfig.type : 'text',
            autoComplete: displayConfig && 'autoComplete' in displayConfig ? displayConfig.autoComplete : undefined,
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
    </FormControl>
  );
};