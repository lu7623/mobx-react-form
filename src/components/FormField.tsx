
import { Input } from '@mui/base/Input';
import { FormControl } from '@mui/base/FormControl';
import { FIELD_DISPLAY, type FieldName } from '../config';

interface FormFieldProps {
  field: {
    label: string;
    placeholder: string;
    hasError: boolean;
    error: string | null;
    bind: () => any;
  };
  fieldName: FieldName;
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
        type={displayConfig.type}
        autoComplete={displayConfig.autoComplete}
        placeholder={field.placeholder}
        error={field.hasError}
        className={`form-input ${field.hasError ? 'error' : ''}`}
        slotProps={{
          input: {
            className: `form-input ${field.hasError ? 'error' : ''}`
          }
        }}
      />
      {field.hasError && (
        <div className="flex items-center gap-1.5 text-error-600 text-xs mt-1.5 animate-fade-in">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
    </FormControl>
  );
};
