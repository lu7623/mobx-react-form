# 🧶 Yarn Calculations Form

A modern, fully reactive React form application built with **MobX React Form** that calculates precise yarn requirements for knitting projects. Features intelligent form logic, real-time calculations, and beautiful responsive design.

## 🎯 Features

### 🧮 Yarn Calculation Engine
- **Real-time Calculations**: Results automatically update as you type
- **Item-specific Formulas**: Different calculation methods per garment type
- **Accurate Pack Estimation**: Automatically calculates yarn packs needed (50g each)
- **Beautiful Results Display**: Gradient UI with formula breakdown
- **Error Handling**: Graceful validation with helpful error messages

### 📐 Smart Calculation Formulas
- **Scarf**: `totalYarn = length × 100 × 3 ÷ yarnLength`
- **Sweater**: `totalYarn = (waist + chest + hips) × 100 × 12 ÷ (3 × yarnLength)`
- **Dress (Short Sleeves)**: `totalYarn = (waist + chest + hips) × 100 × 30 ÷ (3 × yarnLength)`
- **Dress (Long Sleeves)**: `totalYarn = (waist + chest + hips) × 100 × 40 ÷ (3 × yarnLength)`

### 🔄 Reactive Form Logic
- **Field Dependencies**: Automatic field updates based on selections
- **Conditional Fields**: Fields automatically enable/disable based on item type
- **Auto-set Values**: Sleeves length automatically configured for sweaters
- **Body Measurements**: Automatically disabled for scarfs (not required)
- **Size-based Validation**: Body measurement ranges adjust based on selected size (S/M/L/XL)
- **Smart Error Messages**: Context-aware validation messages with size-specific ranges

### Form Fields
- **Yarn Length** (required): 50-800 meters per 100g
- **Item Type** (required): Scarf, Sweater, or Dress
- **Length**: Only for scarfs (10-300 cm)
- **Size**: Only for sweaters/dresses (S, M, L, XL)
- **Sleeves Length**: Only for dresses (Short/Long)
- **Body Measurements**: Only for sweaters/dresses (ranges vary by size)
  - **Size S**: Waist 60-75cm, Chest 80-95cm, Hips 85-100cm
  - **Size M**: Waist 70-85cm, Chest 90-105cm, Hips 95-110cm  
  - **Size L**: Waist 80-95cm, Chest 100-115cm, Hips 105-120cm
  - **Size XL**: Waist 90-110cm, Chest 110-130cm, Hips 115-135cm

## 🏗️ Architecture

### Integrated Calculation System
```
src/
├── config/
│   ├── form-config.ts          # Form configuration + field dependencies
│   ├── validatorjs-config.ts   # Validation messages setup
│   └── index.ts                # Centralized exports
├── components/
│   ├── YarnCalculationResults.tsx  # Reactive results display
│   ├── BodyMeasurementField.tsx    # Specialized measurement inputs
│   └── [other components]          # Form field components
├── calculations/
│   └── yarn-calculations.ts       # Calculation types (legacy)
├── contexts/
│   └── FormContext.tsx            # Form context provider
├── Form.ts                        # Main form class with integrated calculations
└── App.tsx                        # Main application component
```

### Reactive Architecture Pattern
**Form Class as Single Source of Truth:**
```typescript
class MyForm extends Form {
  // Integrated calculation method
  calculateYarnRequirements(): YarnCalculationResult { ... }
  
  // Computed property for readiness
  get isCalculationReady(): boolean { ... }
  
  // Custom validation methods
  validateBodyMeasurement(value, type) { ... }
}
```

**Fully Reactive Components:**
```typescript
// Results automatically update when form changes
export const YarnCalculationResults = observer(() => {
  const form = useFormContext();
  
  if (form.isCalculationReady) {
    const result = form.calculateYarnRequirements();
    // ... render results
  }
});
```

### Field Dependencies System
**Declarative Dependency Configuration:**
```typescript
export const FIELD_DEPENDENCIES = {
  itemType: [
    { targetField: 'sleevesLength', rules: { 'sweater': 'long', 'scarf': '' } },
    { targetField: 'length', rules: { 'scarf': '120', 'sweater': '' } }
  ]
};
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or yarn

### Installation
```bash
# Clone and navigate
cd mobx-react-form

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
npm run lint     # Run ESLint
```

## 🔧 Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### Form Management
- **MobX React Form** - Declarative form state management
- **ValidatorJS** - Validation rules engine
- **MobX React Lite** - React-MobX integration

### Styling
- **Tailwind CSS** - Utility-first styling
- **MUI Base** - Headless UI components

### Testing
- **Vitest** - Unit testing
- **Testing Library** - Component testing

## 📋 Form Validation

### Validation Rules
- **Required fields**: Yarn length, item type
- **Numeric validation**: All measurements with min/max ranges
- **Select validation**: Predefined options only
- **Conditional validation**: Rules change based on item type

### Error Messages
- Clear, user-friendly error messages
- Field-specific validation feedback
- Real-time validation on change/blur

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Grid layouts for measurements
- Adaptive form sections

### User Experience
- **Visual Feedback**: Disabled fields are grayed out
- **Helper Text**: Context-aware hints (e.g., "not required for scarfs")  
- **Form Status**: Real-time validation status display
- **Reset Functionality**: One-click return to defaults

### Accessibility
- Proper form labels and associations
- Keyboard navigation support
- Screen reader friendly

## 🏃‍♂️ Development

### Project Structure Benefits
- **Single Source of Truth**: All configuration in dedicated files
- **Separation of Concerns**: Form logic separated from UI components
- **Type Safety**: Full TypeScript coverage
- **Maintainable**: Clean, readable codebase following official patterns

### Key Decisions
- **Separated Properties Pattern**: Following MobX React Form documentation
- **Simplified Configuration**: Removed complex abstractions for better maintainability
- **Native Form Features**: Using built-in MobX React Form capabilities vs custom solutions

## 📚 Documentation References

- [MobX React Form - Separated Properties](https://foxhound87.github.io/mobx-react-form/docs/fields/defining-flat-fields/separated-properties.html)
- [ValidatorJS Documentation](https://www.npmjs.com/package/validatorjs)
- [React 19 Documentation](https://react.dev/)

## 🎯 Future Enhancements

- [ ] Save/load project calculations
- [ ] Export calculations to PDF
- [ ] Multi-language support
- [ ] Advanced yarn weight calculations
- [ ] Integration with yarn databases

---

**Built with ❤️ using modern React patterns and MobX React Form best practices.**