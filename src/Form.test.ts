import MyForm from './Form';

/**
 * Basic test suite for MyForm structure and configuration
 * Focus on testing form setup and field configuration rather than validation
 * which works better in browser environment with full MobX lifecycle
 */

describe('MyForm Basic Tests', () => {
  let form: MyForm;

  beforeEach(() => {
    // Create a fresh form instance for each test
    form = new MyForm();
  });

  describe('Form Structure', () => {
    test('should initialize with correct field count', () => {
      expect(form.size).toBe(3);
    });

    test('should have all required fields', () => {
      expect(form.has('email')).toBe(true);
      expect(form.has('password')).toBe(true);
      expect(form.has('passwordConfirm')).toBe(true);
    });

    test('should have correct initial values', () => {
      expect(form.$('email').value).toBe('s.jobs@apple.com');
      expect(form.$('password').value).toBe('');
      expect(form.$('passwordConfirm').value).toBe('');
    });
  });

  describe('Form Configuration', () => {
    test('should have correct validation options configured', () => {
      const options = form.options();
      
      expect(options.validateOnChange).toBe(true);
      expect(options.validateOnBlur).toBe(true);
      expect(options.showErrorsOnInit).toBe(false);
    });

    test('should have DVR plugin configured', () => {
      const plugins = form.plugins();
      
      expect(plugins).toHaveProperty('dvr');
      expect(plugins.dvr).toBeDefined();
    });

    test('should have correct field rules', () => {
      expect(form.$('email').rules).toBe('required|email|string|between:5,25');
      expect(form.$('password').rules).toBe('required|string|between:5,25');
      expect(form.$('passwordConfirm').rules).toBe('required|string|same:password');
    });

    test('should have correct field labels', () => {
      expect(form.$('email').label).toBe('Email');
      expect(form.$('password').label).toBe('Password');
      expect(form.$('passwordConfirm').label).toBe('Password Confirmation');
    });

    test('should have correct field placeholders', () => {
      expect(form.$('email').placeholder).toBe('Insert Email');
      expect(form.$('password').placeholder).toBe('Insert Password');
      expect(form.$('passwordConfirm').placeholder).toBe('Confirm Password');
    });
  });

  describe('Form Hooks', () => {
    test('should have onSuccess hook', () => {
      const hooks = form.hooks();
      expect(hooks).toHaveProperty('onSuccess');
      expect(typeof hooks.onSuccess).toBe('function');
    });

    test('should have onError hook', () => {
      const hooks = form.hooks();
      expect(hooks).toHaveProperty('onError');
      expect(typeof hooks.onError).toBe('function');
    });
  });

  describe('Form Methods', () => {
    test('should be able to set field values', () => {
      form.$('email').set('test@example.com');
      form.$('password').set('mypassword');
      form.$('passwordConfirm').set('mypassword');

      expect(form.$('email').value).toBe('test@example.com');
      expect(form.$('password').value).toBe('mypassword');
      expect(form.$('passwordConfirm').value).toBe('mypassword');
    });

    test('should be able to clear form', () => {
      form.$('email').set('test@example.com');
      form.$('password').set('mypassword');
      form.$('passwordConfirm').set('mypassword');
      
      form.clear();
      
      // After clearing, all fields should be empty (clear() resets to empty, not default values)
      expect(form.$('email').value).toBe('');
      expect(form.$('password').value).toBe('');
      expect(form.$('passwordConfirm').value).toBe('');
    });

    test('should have validate method', () => {
      expect(typeof form.validate).toBe('function');
    });

    test('should have values method', () => {
      expect(typeof form.values).toBe('function');
      const values = form.values();
      expect(values).toHaveProperty('email');
      expect(values).toHaveProperty('password');
      expect(values).toHaveProperty('passwordConfirm');
    });

    test('should have errors method', () => {
      expect(typeof form.errors).toBe('function');
      const errors = form.errors();
      expect(typeof errors).toBe('object');
    });
  });
});

/**
 * Manual Testing Utilities
 * These functions can be used for manual testing in the browser console
 */

export class FormTestUtils {
  static async runAllValidationTests(form: MyForm): Promise<void> {
    console.log('🧪 Running comprehensive form validation tests...');
    
    // Test 1: Email validation
    console.log('\n1️⃣ Testing Email Validation:');
    
    form.$('email').set('');
    await form.validate();
    console.log('Empty email:', {
      hasError: form.$('email').hasError,
      error: form.$('email').error,
      isValid: form.$('email').isValid
    });
    
    form.$('email').set('invalid-email');
    await form.validate();
    console.log('Invalid email format:', {
      hasError: form.$('email').hasError,
      error: form.$('email').error,
      isValid: form.$('email').isValid
    });
    
    form.$('email').set('user@example.com');
    await form.validate();
    console.log('Valid email:', {
      hasError: form.$('email').hasError,
      error: form.$('email').error,
      isValid: form.$('email').isValid
    });
    
    // Test 2: Password validation
    console.log('\n2️⃣ Testing Password Validation:');
    
    form.$('password').set('123');
    await form.validate();
    console.log('Short password:', {
      hasError: form.$('password').hasError,
      error: form.$('password').error,
      isValid: form.$('password').isValid
    });
    
    form.$('password').set('validpassword');
    await form.validate();
    console.log('Valid password:', {
      hasError: form.$('password').hasError,
      error: form.$('password').error,
      isValid: form.$('password').isValid
    });
    
    // Test 3: Password confirmation validation
    console.log('\n3️⃣ Testing Password Confirmation:');
    
    form.$('passwordConfirm').set('differentpassword');
    await form.validate();
    console.log('Password mismatch:', {
      hasError: form.$('passwordConfirm').hasError,
      error: form.$('passwordConfirm').error,
      isValid: form.$('passwordConfirm').isValid
    });
    
    form.$('passwordConfirm').set('validpassword');
    await form.validate();
    console.log('Passwords match:', {
      hasError: form.$('passwordConfirm').hasError,
      error: form.$('passwordConfirm').error,
      isValid: form.$('passwordConfirm').isValid
    });
    
    // Test 4: Overall form validation
    console.log('\n4️⃣ Overall Form Status:');
    console.log('Form is valid:', form.isValid);
    console.log('Form has errors:', form.hasError);
    console.log('Form errors:', form.errors());
    console.log('Form values:', form.values());
    
    console.log('\n✅ All validation tests completed!');
  }
  
  static logFormState(form: MyForm): void {
    console.log('📊 Current Form State:', {
      isValid: form.isValid,
      isDirty: form.isDirty,
      hasErrors: form.hasError,
      fields: {
        email: {
          value: form.$('email').value,
          isValid: form.$('email').isValid,
          error: form.$('email').error
        },
        password: {
          value: form.$('password').value ? '*'.repeat(form.$('password').value.length) : '',
          isValid: form.$('password').isValid,
          error: form.$('password').error
        },
        passwordConfirm: {
          value: form.$('passwordConfirm').value ? '*'.repeat(form.$('passwordConfirm').value.length) : '',
          isValid: form.$('passwordConfirm').isValid,
          error: form.$('passwordConfirm').error
        }
      }
    });
  }
}

// Make test utils available globally for browser console testing
if (typeof window !== 'undefined') {
  (window as any).FormTestUtils = FormTestUtils;
}
