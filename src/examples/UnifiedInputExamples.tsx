/**
 * Examples of using the Unified Input System
 * Demonstrates different ways to use the extendable interface system
 */

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MyForm from '../Form';
import { 
  UnifiedInputField,
  EmailInputField,
  PasswordInputField,
  SelectInputField,
  RadioInputField,
  InputElementType,
  createInputField
} from '../components';

// Example 1: Using UnifiedInputField with automatic type detection
const ExampleAutoDetection = observer(() => {
  const [form] = useState(() => new MyForm());

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Auto-Detection Example</h3>
      
      {/* Automatically detects email type from fieldName */}
      <UnifiedInputField 
        field={form.$('email')} 
        fieldName="email" 
      />
      
      {/* Automatically detects password type from fieldName */}
      <UnifiedInputField 
        field={form.$('password')} 
        fieldName="password" 
      />
      
      {/* Automatically detects radio type from fieldName */}
      <UnifiedInputField 
        field={form.$('gender')} 
        fieldName="gender" 
      />
      
      {/* Automatically detects select type from fieldName */}
      <UnifiedInputField 
        field={form.$('dressColor')} 
        fieldName="dressColor" 
        disabled={form.$('gender').value === 'male'}
      />
    </div>
  );
});

// Example 2: Using specific typed input components
const ExampleTypedComponents = observer(() => {
  const [form] = useState(() => new MyForm());

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Typed Components Example</h3>
      
      {/* Type-safe email input */}
      <EmailInputField 
        field={form.$('email')} 
        fieldName="email"
        autoComplete="email"
      />
      
      {/* Type-safe password input */}
      <PasswordInputField 
        field={form.$('password')} 
        fieldName="password"
        autoComplete="new-password"
      />
      
      {/* Type-safe radio input */}
      <RadioInputField 
        field={form.$('gender')} 
        fieldName="gender"
        options={[
          { value: 'female', label: 'Female', description: 'Select if you identify as female' },
          { value: 'male', label: 'Male', description: 'Select if you identify as male' }
        ]}
      />
      
      {/* Type-safe select input */}
      <SelectInputField 
        field={form.$('dressColor')} 
        fieldName="dressColor"
        disabled={form.$('gender').value === 'male'}
        options={[
          { value: 'white', label: 'White' },
          { value: 'red', label: 'Red' },
          { value: 'yellow', label: 'Yellow' }
        ]}
      />
    </div>
  );
});

// Example 3: Using explicit input type specification
const ExampleExplicitTypes = observer(() => {
  const [form] = useState(() => new MyForm());

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Explicit Types Example</h3>
      
      {/* Explicitly specify input type */}
      <UnifiedInputField 
        field={form.$('email')} 
        fieldName="email" 
        inputType={InputElementType.EMAIL}
        variant="detailed"
      />
      
      {/* Override automatic detection */}
      <UnifiedInputField 
        field={form.$('password')} 
        fieldName="password" 
        inputType={InputElementType.PASSWORD}
        variant="compact"
      />
      
      {/* Factory function approach */}
      {createInputField(InputElementType.RADIO, {
        field: form.$('gender'),
        fieldName: 'gender'
      })}
    </div>
  );
});

// Example 4: Custom component extension
interface CustomTextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  field: {
    label: string;
    placeholder: string; 
    hasError: boolean;
    error: string | null;
    bind: () => any;
  };
  fieldName: string;
  rows?: number;
  maxLength?: number;
}

const CustomTextAreaInput: React.FC<CustomTextAreaInputProps> = ({
  field,
  fieldName,
  rows = 3,
  maxLength,
  className,
  ...props
}) => {
  const fieldBind = field.bind();
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {field.label}
      </label>
      <textarea
        {...fieldBind}
        {...props}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-3.5 py-3 text-sm border-2 rounded-lg bg-white transition-all duration-200 outline-none resize-vertical ${
          field.hasError
            ? 'border-error-600 ring-4 ring-error-50'
            : 'border-gray-200 hover:border-gray-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-100'
        } ${className || ''}`}
      />
      {maxLength && (
        <div className="text-xs text-gray-500 text-right">
          {fieldBind.value?.length || 0} / {maxLength}
        </div>
      )}
      {field.hasError && (
        <div className="flex items-center gap-1.5 text-error-600 text-xs mt-1.5 animate-fade-in">
          <span className="text-sm">⚠️</span>
          <span>{field.error}</span>
        </div>
      )}
    </div>
  );
};

// Example 5: Advanced validation and behavior
const ExampleAdvancedFeatures = observer(() => {
  const [form] = useState(() => new MyForm());
  const [customValue, setCustomValue] = useState('');

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Advanced Features Example</h3>
      
      {/* All variants demonstrated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Default Variant</h4>
          <UnifiedInputField 
            field={form.$('email')} 
            fieldName="email" 
            variant="default"
          />
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Compact Variant</h4>
          <UnifiedInputField 
            field={form.$('password')} 
            fieldName="password" 
            variant="compact"
          />
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Detailed Variant</h4>
          <UnifiedInputField 
            field={form.$('gender')} 
            fieldName="gender" 
            variant="detailed"
          />
        </div>
      </div>
      
      {/* Custom textarea example */}
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Component Extension</h4>
        <CustomTextAreaInput
          field={{
            label: 'Comments',
            placeholder: 'Enter your comments here...',
            hasError: customValue.length > 200,
            error: customValue.length > 200 ? 'Comments must be 200 characters or less' : null,
            bind: () => ({
              value: customValue,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomValue(e.target.value),
              onBlur: () => {}
            })
          }}
          fieldName="comments"
          rows={4}
          maxLength={200}
        />
      </div>
      
      {/* Test data display */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Form Values (Debug)</h4>
        <pre className="text-xs text-gray-600">
          {JSON.stringify(form.values(), null, 2)}
        </pre>
      </div>
    </div>
  );
});

// Main examples component
export const UnifiedInputExamples: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Unified Input System Examples
        </h1>
        <p className="text-gray-600">
          Demonstrating the extendable InputElementType interface system
        </p>
      </div>
      
      <ExampleAutoDetection />
      <ExampleTypedComponents />
      <ExampleExplicitTypes />
      <ExampleAdvancedFeatures />
    </div>
  );
};

export default UnifiedInputExamples;
