import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { FIELDS, VALUES, LABELS, PLACEHOLDERS, RULES, DEFAULTS, DISABLED } from './config/form-config';

// Import validatorjs configuration - this initializes the library automatically
import './config/validatorjs-config';


export default class MyForm extends Form {
  
  constructor() {
    super();
  }

  /*
    Below we are returning a `plugins` object using the `validatorjs` package
    to enable `DVR` functionalities (Declarative Validation Rules).
  */
  plugins() {
    return {
      dvr: dvr({ package: validatorjs }),
    };
  }

  /*
    Form options to enable validation on change and blur
    strictSelect: false is required for computed properties to access fields before creation
  */
  options() {
    return {
      validateOnChange: true,
      validateOnBlur: true,
      showErrorsOnInit: false,
      strictSelect: false, // Required for computed properties
    };
  }

  /*
    Return the `fields` as a collection into the `setup()` method
    Fields, validation rules, default values, computed properties,
    and custom validators are all loaded from separate configuration files.
  */
  setup() {
    return {
      fields: FIELDS,
      values: VALUES,
      labels: LABELS,
      placeholders: PLACEHOLDERS,
      rules: RULES,
      defaults: DEFAULTS,
      disabled: DISABLED
    };
  }

  /*
    Reset form to default values
  */
  resetToDefaults() {
    console.log('Reset to defaults called');
    this.reset();
  }

  /*
    Event Hooks
  */
  hooks() {
    return {
      onSuccess: (form: Form) => {
        alert('Form is valid! Send the request here.');
        console.log('Form Values!', form.values());
      },
      onError: (form: Form) => {
        alert('Form has errors!');
        console.log('All form errors', form.errors());
      },
    };
  }
}