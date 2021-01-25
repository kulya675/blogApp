import type { FormFieldType, SignUpFieldNameType, SignInFieldNameType, ProfileFieldNameType } from '../../@types/index';

const signUpFormFields: FormFieldType<SignUpFieldNameType>[] = [
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'email',
    label: 'Email adress',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'repeat',
    label: 'Repeat Password',
    type: 'password',
  },
];

const signInFormFields: FormFieldType<SignInFieldNameType>[] = [
  {
    name: 'email',
    label: 'Email adress',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
];

const profileFormFields: FormFieldType<ProfileFieldNameType>[] = [
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'email',
    label: 'Email adress',
  },
  {
    name: 'password',
    label: 'New Password',
    type: 'password',
  },
  {
    name: 'image',
    label: 'Avatar image (url)',
  },
];

export { signUpFormFields, signInFormFields, profileFormFields };
