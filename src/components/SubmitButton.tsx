import { Button } from '@mui/base/Button';

interface SubmitButtonProps {
  isValid: boolean;
}

export const SubmitButton = ({ isValid }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={!isValid}
      className={`btn-primary mt-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
      slotProps={{
        root: {
          className: `btn-primary mt-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`
        }
      }}
    >
      <span className="flex items-center justify-center gap-2">
        <span className="text-lg">
          {isValid ? '🚀' : '⏳'}
        </span>
        <span>
          {isValid ? 'Submit Registration' : 'Complete Form'}
        </span>
      </span>
    </Button>
  );
};
