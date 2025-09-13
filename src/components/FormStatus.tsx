interface FormStatusProps {
  isValid: boolean;
  isDirty: boolean;
}

export const FormStatus = ({ isValid, isDirty }: FormStatusProps) => {
  return (
    <div className={`mt-5 p-4 rounded-lg border animate-slide-up ${
      isValid 
        ? 'bg-green-50 border-green-200' 
        : 'bg-amber-50 border-amber-200'
    }`}>
      <div className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
        isValid ? 'text-green-700' : 'text-amber-700'
      }`}>
        <span className="text-base">
          {isValid ? '✅' : '📝'}
        </span>
        <span>
          {isValid ? 'Form Valid' : 'Form Incomplete'}
        </span>
      </div>
      
      {isDirty && (
        <div className="text-xs text-gray-600 flex items-center gap-1 mb-2">
          <span>✏️</span>
          <span>Form has been modified</span>
        </div>
      )}
      
      {!isValid && (
        <div className="text-xs text-gray-600">
          Please fill out all required fields with valid information
        </div>
      )}
    </div>
  );
};
