import { FormControl } from '@mui/base/FormControl';

interface FormFieldProps {
  field: any;
  fieldName?: string; // Optional for backward compatibility
  type?: string;
}

export const FormField = ({ field, type = 'text' }: FormFieldProps) => {

  return (
    <FormControl className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {field.label}
      </label>
      <input
        {...field.bind()}
        type={type}
        placeholder={field.placeholder}
        className={`w-full px-3.5 py-3 text-sm border-2 rounded-lg bg-white outline-none ${
          field.hasError
            ? 'border-red-600 ring-4 ring-red-50'
            : 'border-gray-200 hover:border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
        }`}
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