import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import MyForm from './Form';
import { FormField, SubmitButton, FormStatus, RadioField, SelectField } from './components';

const App = observer(() => {
  // Create form instance
  const [form] = useState(() => new MyForm());
  
  // Get current gender value for conditional logic
  const genderValue = form.$('gender').value;

  return (
    <div 
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}
    >
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-600 mb-2">
            Registration Form
          </h2>
          <p className="text-gray-600 text-sm">
            Create your account with secure validation
          </p>
        </div>
      
      <form onSubmit={form.onSubmit} className="space-y-5">
        {/* Basic Fields */}
        <FormField field={form.$('email')} fieldName="email" />
        <FormField field={form.$('password')} fieldName="password" />
        <FormField field={form.$('passwordConfirm')} fieldName="passwordConfirm" />

        {/* Gender Selection */}
        <RadioField 
          field={form.$('gender')} 
          fieldName="gender"
          options={[
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' }
          ]}
        />

        {/* Conditional Color Fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 border-t pt-4">
            Clothing Preferences
          </h3>
          
          {/* Dress Color - Disabled when gender is 'male' */}
          <SelectField 
            field={form.$('dressColor')} 
            fieldName="dressColor" 
            disabled={genderValue === 'male'}
            options={[
              { value: 'white', label: 'White' },
              { value: 'red', label: 'Red' },
              { value: 'yellow', label: 'Yellow' }
            ]}
          />
          
          {/* Pants Color - Disabled when gender is 'female' */}
          <SelectField 
            field={form.$('pantsColor')} 
            fieldName="pantsColor" 
            disabled={genderValue === 'female'}
            options={[
              { value: 'black', label: 'Black' },
              { value: 'blue', label: 'Blue' },
              { value: 'brown', label: 'Brown' }
            ]}
          />
        </div>

        {/* Submit Button */}
        <SubmitButton isValid={form.isValid} />

        {/* Form Status */}
        <FormStatus isValid={form.isValid} isDirty={form.isDirty} />
      </form>
      </div>
    </div>
  );
});

export default App
