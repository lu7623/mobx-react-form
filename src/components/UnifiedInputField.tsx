/**
 * Unified Input Field Component
 * Renders different input types based on configuration using the extendable interface system
 */

import React from 'react';
import { 
  InputElementType, 
  getInputElementType,
  isTextInputProps,
  isSelectInputProps,
  isRadioInputProps
} from '../types/InputElementTypes';
import type {
  InputElementProps,
  BaseInputElementProps,
  TextInputElementProps,
  SelectInputElementProps,
  RadioInputElementProps
} from '../types/InputElementTypes';
import { FIELD_DISPLAY } from '../config';

// Import existing components
import { FormField } from './FormField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';

/**
 * Props for the unified input field
 */
interface UnifiedInputFieldProps extends BaseInputElementProps {
  inputType?: InputElementType;
  variant?: 'default' | 'compact' | 'detailed';
}

/**
 * Unified Input Field Component
 * Automatically renders the appropriate input type based on configuration
 */
export const UnifiedInputField: React.FC<UnifiedInputFieldProps> = ({
  field,
  fieldName,
  disabled = false,
  inputType,
  variant = 'default',
  className,
  'data-testid': testId
}) => {
  // Determine input type from configuration or prop
  const elementType = inputType || getInputElementType(fieldName);
  const displayConfig = FIELD_DISPLAY[fieldName];
  
  // Create appropriate props based on input type
  const createInputProps = (): InputElementProps => {
    const baseProps = {
      field,
      fieldName,
      disabled,
      className,
      'data-testid': testId
    };

    switch (elementType) {
      case InputElementType.TEXT:
      case InputElementType.EMAIL:
      case InputElementType.PASSWORD:
        return {
          ...baseProps,
          type: elementType,
          autoComplete: 'autoComplete' in displayConfig ? displayConfig.autoComplete : undefined,
        } as TextInputElementProps;

      case InputElementType.SELECT:
        return {
          ...baseProps,
          options: 'options' in displayConfig ? displayConfig.options || [] : [],
        } as SelectInputElementProps;

      case InputElementType.RADIO:
        return {
          ...baseProps,
          options: 'options' in displayConfig ? displayConfig.options || [] : [],
          inline: false,
        } as RadioInputElementProps;

      default:
        return baseProps as TextInputElementProps;
    }
  };

  const inputProps = createInputProps();

  // Render appropriate component based on type
  const renderInputElement = (): React.ReactElement => {
    switch (elementType) {
      case InputElementType.TEXT:
      case InputElementType.EMAIL:
      case InputElementType.PASSWORD:
        if (isTextInputProps(inputProps)) {
          return <FormField {...inputProps} />;
        }
        break;

      case InputElementType.SELECT:
        if (isSelectInputProps(inputProps)) {
          return <SelectField {...inputProps} />;
        }
        break;

      case InputElementType.RADIO:
        if (isRadioInputProps(inputProps)) {
          return <RadioField {...inputProps} />;
        }
        break;

      default:
        // Fallback to text input
        return <FormField field={field} fieldName={fieldName} />;
    }

    // Fallback
    return <FormField field={field} fieldName={fieldName} />;
  };

  // Wrap in container based on variant
  const renderWithVariant = (element: React.ReactElement): React.ReactElement => {
    switch (variant) {
      case 'compact':
        return (
          <div className="space-y-1">
            {element}
          </div>
        );

      case 'detailed':
        return (
          <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            {element}
            {displayConfig && 'description' in displayConfig && displayConfig.description && (
              <p className="text-xs text-gray-600 mt-1">
                {displayConfig.description}
              </p>
            )}
          </div>
        );

      case 'default':
      default:
        return element;
    }
  };

  return renderWithVariant(renderInputElement());
};

/**
 * Higher-order component for creating type-specific input fields
 */
export const createTypedInputField = <T extends InputElementProps>(
  inputType: InputElementType
) => {
  return React.forwardRef<HTMLElement, Omit<T, 'inputType'>>((props, ref) => {
    return (
      <UnifiedInputField
        {...(props as any)}
        inputType={inputType}
        ref={ref}
      />
    );
  });
};

/**
 * Pre-configured input field components using the unified system
 */
export const TextInputField = createTypedInputField<TextInputElementProps>(InputElementType.TEXT);
export const EmailInputField = createTypedInputField<TextInputElementProps>(InputElementType.EMAIL);
export const PasswordInputField = createTypedInputField<TextInputElementProps>(InputElementType.PASSWORD);
export const SelectInputField = createTypedInputField<SelectInputElementProps>(InputElementType.SELECT);
export const RadioInputField = createTypedInputField<RadioInputElementProps>(InputElementType.RADIO);

/**
 * Input field factory function
 */
export const createInputField = (
  type: InputElementType,
  props: BaseInputElementProps
): React.ReactElement => {
  return <UnifiedInputField {...props} inputType={type} />;
};
