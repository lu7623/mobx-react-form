import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

// Configure validatorjs with default English messages to fix template errors
validatorjs.useLang('en');
validatorjs.setMessages('en', {
  required: 'The :attribute field is required.',
  email: 'The :attribute format is invalid.',
  string: 'The :attribute must be a string.',
  between: {
    numeric: 'The :attribute must be between :min and :max.',
    string: 'The :attribute must be between :min and :max characters.',
  },
  same: 'The :attribute and :other must match.',
});

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
    with a `rules` property for the validation.
  */
  setup() {
    return {
      fields: [{
        name: 'email',
        label: 'Email',
        placeholder: 'Insert Email',
        rules: 'required|email|string|between:5,25',
        value: 's.jobs@apple.com'
      }, {
        name: 'password',
        label: 'Password',
        placeholder: 'Insert Password',
        rules: 'required|string|between:5,25',
      }, {
        name: 'passwordConfirm',
        label: 'Password Confirmation',
        placeholder: 'Confirm Password',
        rules: 'required|string|same:password',
      }],
    };
  }

  /*
    Event Hooks
  */
  hooks() {
    return {
      /*
        Success Validation Hook
      */
      onSuccess(form: Form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
      },
      /*
        Error Validation Hook
      */
      onError(form:Form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
      }
    };
  }
}
