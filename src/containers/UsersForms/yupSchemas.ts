import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const signUpFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username field is required.')
    .min(3, 'Your username must be at least 3 charecters.')
    .max(30, 'Must be shorter than 20 charecters.'),
  email: yup.string().email('Invalid email adress.').required('Email field is required.'),
  password: yup
    .string()
    .required('Password field is required.')
    .min(6, 'Your password needs to be at least 6 characters.')
    .max(40, "Man, it's too long."),
  repeat: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('You need to repeat password.'),
});

export const signInFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email adress.').required('Email field is required.'),
  password: yup.string().required('Password field is required.'),
});

export const ProfileFormschema = yup.object().shape({
  username: yup.string().max(30, 'Must be shorter than 20 charecters.'),
  email: yup.string().email('Invalid email adress.'),
  password: yup.string().max(40, "Man, it's too long."),
  image: yup.string(),
});
