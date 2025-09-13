# Form Configuration Guide

This document explains the modular configuration structure for the MobX React Form validation system.

## 📁 Configuration Structure

```
src/config/
├── index.ts              # Main configuration exports
├── fields.ts             # Field definitions and display config
├── validation-rules.ts   # Validation rules and constraints
└── config.test.ts        # Configuration tests
```

## 🔧 Configuration Files

### `fields.ts` - Field Definitions

Contains all form field configurations including labels, placeholders, default values, and validation rules.

```typescript
export interface FieldDefinition {
  name: string;
  label: string;
  placeholder: string;
  value?: string;
  rules: string;
}

export const FORM_FIELDS: FieldDefinition[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    value: 's.jobs@apple.com',
    rules: 'required|email|string|between:5,25'
  },
  // ... more fields
];
```

**Key Features:**
- ✅ Centralized field definitions
- ✅ Type-safe field configuration interface
- ✅ Helper functions for field access
- ✅ Display configuration with input types and descriptions
- ✅ Field name type safety

### `validation-rules.ts` - Validation Configuration

Contains validation rules, constraints, error messages, and rule builders.

```typescript
export const VALIDATION_RULES = {
  email: 'required|email|string|between:5,25',
  password: 'required|string|between:5,25',
  passwordConfirm: 'required|string|same:password'
} as const;
```

**Key Features:**
- ✅ Validation rule definitions
- ✅ Custom error message templates
- ✅ Field-specific validation constraints
- ✅ Rule builder functions for dynamic rules
- ✅ Comprehensive error message templates

### `index.ts` - Configuration Exports

Central export point for all configuration modules.

```typescript
export * from './fields';
export * from './validation-rules';
```

## 🚀 Usage Examples

### Basic Usage in Form Component

```typescript
import { FORM_FIELDS, VALIDATION_MESSAGES } from './config';

export default class MyForm extends Form {
  setup() {
    return {
      fields: FORM_FIELDS,
    };
  }
}
```

### Getting Field Configuration

```typescript
import { getFieldConfig, getFieldNames } from './config';

// Get specific field config
const emailConfig = getFieldConfig('email');
console.log(emailConfig?.label); // "Email"

// Get all field names
const fieldNames = getFieldNames();
console.log(fieldNames); // ["email", "password", "passwordConfirm"]
```

### Using Validation Rule Builders

```typescript
import { buildValidationRule } from './config';

// Build custom email rule
const customEmailRule = buildValidationRule.emailField(3, 50);
// Result: "required|email|string|between:3,50"

// Build custom confirmation field
const customConfirmRule = buildValidationRule.confirmationField('newPassword', 8, 100);
// Result: "required|string|between:8,100|same:newPassword"
```

### Accessing Validation Constraints

```typescript
import { getValidationConstraints } from './config';

const emailConstraints = getValidationConstraints('email');
console.log(emailConstraints.minLength); // 5
console.log(emailConstraints.maxLength); // 25
console.log(emailConstraints.pattern);   // Email regex pattern
```

## 🎯 Benefits of This Structure

### **1. Separation of Concerns**
- ✅ Field definitions separated from validation logic
- ✅ UI components don't need to know validation details
- ✅ Easy to maintain and update

### **2. Type Safety**
- ✅ TypeScript interfaces ensure configuration consistency
- ✅ Compile-time checking of field names and types
- ✅ IntelliSense support for configuration access

### **3. Reusability**
- ✅ Configuration can be shared across components
- ✅ Rule builders allow dynamic validation creation
- ✅ Easy to extend with new fields and rules

### **4. Maintainability**
- ✅ Single source of truth for field definitions
- ✅ Easy to update validation rules without touching form logic
- ✅ Comprehensive test coverage for configurations

### **5. Flexibility**
- ✅ Support for custom validation rules
- ✅ Field-specific error messages
- ✅ Dynamic rule generation
- ✅ Easy to extend with new validation types

## 🔄 Adding New Fields

### 1. Add Field Definition

```typescript
// In fields.ts
const newField = {
  name: 'username',
  label: 'Username',
  placeholder: 'Enter username',
  rules: 'required|string|between:3,20'
};

export const FORM_FIELDS = [
  // ... existing fields
  newField
];
```

### 2. Add Validation Rule

```typescript
// In validation-rules.ts
export const VALIDATION_RULES = {
  // ... existing rules
  username: 'required|string|between:3,20'
} as const;
```

### 3. Add Display Configuration

```typescript
// In fields.ts
export const FIELD_DISPLAY = {
  // ... existing display config
  username: {
    type: 'text',
    autoComplete: 'username',
    description: 'Username must be between 3-20 characters'
  }
} as const;
```

### 4. Add Error Messages

```typescript
// In validation-rules.ts
export const FIELD_ERROR_MESSAGES = {
  // ... existing messages
  username: {
    required: 'Username is required',
    between: 'Username must be between 3 and 20 characters'
  }
} as const;
```

## 🧪 Testing Configuration

```bash
# Run configuration tests
npm run test src/config/config.test.ts

# Run all tests including configuration
npm run test:run
```

The configuration tests ensure:
- ✅ All fields have complete configuration
- ✅ Field names are consistent across all config objects
- ✅ Validation rules match field definitions
- ✅ Helper functions work correctly
- ✅ Rule builders generate correct validation strings

## 🔍 Configuration Validation

The system includes several validation mechanisms:

1. **Type Safety**: TypeScript interfaces prevent configuration errors
2. **Integration Tests**: Ensure consistency across configuration objects
3. **Runtime Validation**: Helper functions validate configuration access
4. **Comprehensive Tests**: 100% test coverage of configuration modules

## 📈 Extending the System

### Custom Validation Rules

```typescript
// Add to buildValidationRule in validation-rules.ts
export const buildValidationRule = {
  // ... existing builders
  phoneNumber: () => 'required|regex:/^[+]?[0-9\\s\\-\\(\\)]+$/',
  strongPassword: () => 'required|string|between:8,128|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/'
};
```

### Custom Field Types

```typescript
// Add to FIELD_DISPLAY in fields.ts
export const FIELD_DISPLAY = {
  // ... existing display config
  phone: {
    type: 'tel',
    autoComplete: 'tel',
    description: 'Enter your phone number'
  },
  birthDate: {
    type: 'date',
    autoComplete: 'bday',
    description: 'Select your birth date'
  }
} as const;
```

This modular configuration system makes the form validation system highly maintainable, extensible, and type-safe! 🎉
