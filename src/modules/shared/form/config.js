
export const LOGIN_FORM = {
  name: 'login',
  submitText: 'LOGIN',
  fields: [
    {
      name: 'email',
      keyboardType: 'email-address',
      placeholder: 'Email *',
      autoCapitalize: 'none'
    },
    { name: 'password',
      secureTextEntry: true,
      placeholder: 'Password *',
      autoCapitalize: 'none'
    }
  ],
  validate: values => {
    const errors = {};
    if (!values.get('email')) {
      errors.email = 'Enter email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
      errors.email = 'Enter a valid email';
    }
    if (!values.get('password')) {
      errors.password = 'Enter password';
    }
    return errors;
  }
};

export const REGISTER_FORM = {
  name: 'register',
  submitText: 'REGISTER',
  fields: [
    {
      name: 'firstName',
      placeholder: 'First name *',
      autoCapitalize: 'none'
    },
    {
      name: 'lastName',
      placeholder: 'Last name *',
      autoCapitalize: 'none'
    },
    {
      name: 'email',
      keyboardType: 'email-address',
      placeholder: 'Email *',
      autoCapitalize: 'none'
    },
    {
      name: 'password',
      secureTextEntry: true,
      placeholder: 'Password *',
      autoCapitalize: 'none'
    },
    {
      name: 'confirmPassword',
      secureTextEntry: true,
      placeholder: 'Confirm password *',
      autoCapitalize: 'none'
    }
  ],
  validate: values => {
    const errors = {};
    if (!values.get('firstName')) {
      errors.firstName = 'Enter first name';
    }
    if (!values.get('lastName')) {
      errors.lastName = 'Enter last name';
    }
    if (!values.get('email')) {
      errors.email = 'Enter email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
      errors.email = 'Enter a valid email';
    }
    if (!values.get('password')) {
      errors.password = 'Enter password';
    }
    if (values.get('password') !== values.get('confirmPassword')) {
      errors.confirmPassword = 'Confirm password does not match';
    }
    return errors;
  }
};
