import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import MyForm from './Form';
import { NumberField, SubmitButton, FormStatus, RadioField, SelectField } from './components';

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
            
            {/* Length - Disabled when item type is not 'scarf' */}
            <NumberField 
              field={form.$('length')} 
              fieldName="length"
              disabled={form.$('length').disabled}
            />
            
            {/* Size - Disabled when item type is 'scarf' */}
            <SelectField 
              field={form.$('size')} 
              fieldName="size"
              disabled={form.$('size').disabled}
              options={[
                { value: 'S', label: 'Small (S)' },
                { value: 'M', label: 'Medium (M)' },
                { value: 'L', label: 'Large (L)' },
                { value: 'XL', label: 'Extra Large (XL)' }
              ]}
            />

            {/* Sleeves Length - Disabled when item type is not 'dress' */}
            <RadioField 
              field={form.$('sleevesLength')} 
              fieldName="sleevesLength"
              disabled={form.$('sleevesLength').disabled}
              options={[
                { value: 'short', label: 'Short Sleeves' },
                { value: 'long', label: 'Long Sleeves' }
              ]}
            />
          </div>

          {/* Body Measurements */}
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Body Measurements
                {form.$('itemType')?.value === 'scarf' && (
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    (not required for scarfs)
                  </span>
                )}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Waist Measurement */}
              <NumberField 
                field={form.$('bodyMeasurements.waist')} 
                fieldName="bodyMeasurements.waist"
                disabled={form.$('bodyMeasurements.waist').disabled}
              />
              
              {/* Chest Measurement */}
              <NumberField 
                field={form.$('bodyMeasurements.chest')} 
                fieldName="bodyMeasurements.chest"
                disabled={form.$('bodyMeasurements.chest').disabled}
              />
              
              {/* Hips Measurement */}
              <NumberField 
                field={form.$('bodyMeasurements.hips')} 
                fieldName="bodyMeasurements.hips"
                disabled={form.$('bodyMeasurements.hips').disabled}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <SubmitButton isValid={form.isValid} />
            <button
              type="button"
              onClick={() => form.resetToDefaults()}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              Reset to Defaults
            </button>
          </div>

          {/* Form Status */}
          <FormStatus isValid={form.isValid} isDirty={form.isDirty} />
      </form>
      </div>
    </div>
  );
});

export default App
