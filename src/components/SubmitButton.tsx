import { Button } from '@mui/base/Button';

interface SubmitButtonProps {
  isValid: boolean;
}

export const SubmitButton = ({ isValid }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      disabled={!isValid}
      className={`w-full px-6 py-3.5 text-base font-semibold border-none rounded-lg cursor-pointer transform ${
        isValid 
          ? 'text-white bg-primary-600 hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-lg' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      {isValid ? 'Submit Form' : 'Please Complete Form'}
    </Button>
  );
};