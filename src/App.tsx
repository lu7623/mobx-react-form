import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import MyForm from './Form';
import { FormField, SubmitButton, FormStatus } from './components';
import './App.css'

const App = observer(() => {
  // Create form instance
  const [form] = useState(() => new MyForm());

  return (
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
        {/* Form Fields */}
        <FormField field={form.$('email')} fieldName="email" />
        <FormField field={form.$('password')} fieldName="password" />
        <FormField field={form.$('passwordConfirm')} fieldName="passwordConfirm" />

        {/* Submit Button */}
        <SubmitButton isValid={form.isValid} />

        {/* Form Status */}
        <FormStatus isValid={form.isValid} isDirty={form.isDirty} />
      </form>
    </div>
  );
});

export default App
