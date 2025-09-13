import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import MyForm from './Form';
import { FormField, NumberField, SubmitButton, FormStatus, RadioField, SelectField } from './components';

const App = observer(() => {
  // Create form instance
  const [form] = useState(() => new MyForm());

  return (
    <div 
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}
    >
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-600 mb-2">
            Yarn Calculations
          </h2>
          <p className="text-gray-600 text-sm">
            Calculate yarn requirements for your knitting projects
          </p>
        </div>
        
        <form onSubmit={form.onSubmit} className="space-y-5">
          {/* Basic Yarn Info */}
          <NumberField field={form.$('yarnLength')} fieldName="yarnLength" />

          {/* Item Type Selection */}
          <SelectField 
            field={form.$('itemType')} 
            fieldName="itemType"
            options={[
              { value: 'scarf', label: 'Scarf' },
              { value: 'sweater', label: 'Sweater' },
              { value: 'dress', label: 'Dress' }
            ]}
          />

          {/* Conditional Fields based on Item Type */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 border-t pt-4">
              Item Specifications
            </h3>
            
            {/* Length */}
            <NumberField 
              field={form.$('length')} 
              fieldName="length"
            />
            
            {/* Size */}
            <SelectField 
              field={form.$('size')} 
              fieldName="size" 
              options={[
                { value: 'S', label: 'Small (S)' },
                { value: 'M', label: 'Medium (M)' },
                { value: 'L', label: 'Large (L)' },
                { value: 'XL', label: 'Extra Large (XL)' }
              ]}
            />

            {/* Sleeves Length */}
            <RadioField 
              field={form.$('sleevesLength')} 
              fieldName="sleevesLength"
              options={[
                { value: 'short', label: 'Short Sleeves' },
                { value: 'long', label: 'Long Sleeves' }
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
