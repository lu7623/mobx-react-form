import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { FORM_FIELDS, VALIDATION_MESSAGES } from './config';

// Configure validatorjs with validation messages from config
validatorjs.useLang('en');
validatorjs.setMessages('en', VALIDATION_MESSAGES);

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
  */
  options() {
    return {
      validateOnChange: true,
      validateOnBlur: true,
      showErrorsOnInit: false,
    };
  }

  /*
    Return the `fields` as a collection into the `setup()` method
    Fields and validation rules are loaded from separate configuration files.
    Also define initial values here as per mobx-react-form documentation.
  */
  setup() {
    return {
      fields: FORM_FIELDS,
      initials: {
        yarnLength: '400',
        itemType: 'scarf',
        length: '120',
        size: '',
        sleevesLength: ''
      }
    };
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
      }
    };
  }
}