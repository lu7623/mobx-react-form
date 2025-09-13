import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import MyForm from './Form';
import './App.css'

const App = observer(() => {
  // Create form instance
  const [form] = useState(() => new MyForm());

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Registration Form</h2>
      <form onSubmit={form.onSubmit}>
        
        {/* Email Field */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            {form.$('email').label}
          </label>
          <input
            {...form.$('email').bind()}
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${form.$('email').hasError ? 'red' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          {form.$('email').hasError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {form.$('email').error}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            {form.$('password').label}
          </label>
          <input
            {...form.$('password').bind()}
            type="password"
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${form.$('password').hasError ? 'red' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          {form.$('password').hasError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {form.$('password').error}
            </div>
          )}
        </div>

        {/* Password Confirmation Field */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="passwordConfirm" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            {form.$('passwordConfirm').label}
          </label>
          <input
            {...form.$('passwordConfirm').bind()}
            type="password"
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${form.$('passwordConfirm').hasError ? 'red' : '#ccc'}`,
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          {form.$('passwordConfirm').hasError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {form.$('passwordConfirm').error}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
          disabled={!form.isValid}
        >
          Submit
        </button>


        {/* Form Status */}
        <div style={{ marginTop: '15px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Form Status: {form.isValid ? '✅ Valid' : '❌ Invalid'}
          </div>
          {form.isDirty && (
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Form has been modified
            </div>
          )}
        </div>
      </form>
    </div>
  );
});

export default App
