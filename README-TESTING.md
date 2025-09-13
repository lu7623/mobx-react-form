# Form Validation Testing Guide

This document explains how to test the MobX React Form validation functionality.

## 🧪 Running Tests

### Automated Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test

# Run tests once
npm run test:run
```

### Manual Browser Testing
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:5173/` in your browser

3. Open browser Developer Console (F12)

4. Test validation by:
   - Clearing the email field → Should show red border and error message
   - Entering invalid email (e.g., "invalid-email") → Should show format error
   - Making password too short (less than 5 chars) → Should show length error
   - Making password confirmation different → Should show mismatch error

## 🎯 Test Cases Covered

### Email Field Validation
- ✅ Valid email format (user@example.com)
- ✅ Required field validation (empty email)
- ✅ Invalid email format (invalid-email)
- ✅ Length validation (between 5-25 characters)

### Password Field Validation  
- ✅ Valid password length (5-25 characters)
- ✅ Required field validation (empty password)
- ✅ Length validation (too short/too long)

### Password Confirmation Validation
- ✅ Passwords match validation
- ✅ Required field validation
- ✅ Password mismatch detection

### Form-wide Validation
- ✅ Overall form validity
- ✅ Form state management (dirty, valid, errors)
- ✅ Form clearing functionality

## 🔧 Using Test Utilities in Browser Console

The test file exports `FormTestUtils` which provides utilities for manual testing:

```javascript
// Access the form instance (assuming you have one in scope)
const form = new MyForm();

// Run comprehensive validation tests
FormTestUtils.runAllValidationTests(form);

// Log current form state
FormTestUtils.logFormState(form);
```

## 🐛 Known Issues

1. **Async Validation**: Some validation tests may fail in automated testing due to timing issues with async validation
2. **Environment Setup**: Tests work better in browser environment where the full MobX React Form lifecycle is available

## 📝 Test Structure

```
src/
├── Form.test.ts           # Comprehensive automated tests
├── test-setup.ts          # Test environment configuration
└── Form.ts               # Form implementation with validation rules
```

## 🚀 Adding New Tests

To add new validation tests:

1. Open `src/Form.test.ts`
2. Add new test cases following the existing patterns:
   ```typescript
   test('should validate my new rule', async () => {
     form.$('fieldName').set('testValue');
     await form.validate();
     
     expect(form.$('fieldName').isValid).toBe(true/false);
     expect(form.$('fieldName').error).toBe(null/'expected error message');
   });
   ```

## 📊 Form Validation Rules Reference

| Field | Rules | Description |
|-------|-------|-------------|
| email | `required\|email\|string\|between:5,25` | Required, valid email, 5-25 chars |
| password | `required\|string\|between:5,25` | Required, string, 5-25 chars |
| passwordConfirm | `required\|string\|same:password` | Required, must match password |

## 🎨 Visual Validation Feedback

The form provides real-time visual feedback:
- **Red borders** for invalid fields
- **Error messages** below each field
- **Form status indicator** showing overall validity
- **Submit button** disabled when form is invalid

## 🔍 Debugging Form Issues

If validation isn't working:

1. Check browser console for errors
2. Verify validatorjs message templates are loaded
3. Ensure form plugins (DVR) are properly configured
4. Test manual validation with `form.validate()`
5. Use the debug utilities: `FormTestUtils.logFormState(form)`
