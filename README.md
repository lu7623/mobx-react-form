# Yarn Calculations Form

A modern React form application built with **MobX React Form** using the simplified **separated properties pattern**. Calculate yarn requirements for knitting projects including scarfs, sweaters, and dresses.

## 🎯 Features

### Smart Form Logic
- **Conditional Fields**: Fields automatically enable/disable based on item type
- **Body Measurements**: Automatically disabled for scarfs (not required)
- **Item-specific Validation**: Different validation rules per item type
- **Real-time Updates**: Form reacts instantly to user input changes

### Form Fields
- **Yarn Length** (required): 50-800 meters per 100g
- **Item Type** (required): Scarf, Sweater, or Dress
- **Length**: Only for scarfs (10-300 cm)
- **Size**: Only for sweaters/dresses (S, M, L, XL)
- **Sleeves Length**: Only for dresses (Short/Long)
- **Body Measurements**: Only for sweaters/dresses
  - Waist: 40-180 cm
  - Chest: 50-200 cm  
  - Hips: 60-220 cm

## 🏗️ Architecture

### Simplified Structure (Following MobX React Form Best Practices)
```
src/
├── config/
│   ├── form-config.ts       # Separated properties (FIELDS, RULES, etc.)
│   ├── validatorjs-config.ts # Validation messages setup
│   └── index.ts             # Centralized exports
├── components/              # Reusable UI components
├── Form.ts                  # Main form class
└── App.tsx                  # Main application component
```

### Configuration Pattern
Uses **MobX React Form's separated properties** pattern:
```typescript
// Clean separated configuration
export const FIELDS = ['yarnLength', 'itemType', ...];
export const RULES = { yarnLength: 'required|numeric|min:50|max:800', ... };
export const LABELS = { yarnLength: 'Yarn Length per 100g', ... };
export const DISABLED = { size: ({ form }) => form.$('itemType')?.value === 'scarf' };
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
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