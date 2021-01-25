import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { signInFormSchema } from './yupSchemas';
import blogApi from '../../service/api';
import { logIn } from '../../redux/actions/userActions';
import FormField from './FormField';
import { signInFormFields } from './usersFormsProps';

import type {
  SignInFormType,
  SignInFieldNameType,
  ServerValidationErrorsType,
  UserResponseType,
  FormFieldType,
} from '../../@types/index';

import styles from './UsersForms.module.scss';

const useStyles = makeStyles({
  input: {
    height: 40,
    marginBottom: 24,
  },
  label: {
    marginTop: 21,
    marginBottom: 21,
    paddingTop: 8,
    fontSize: 14,
    color: '#595959',
    borderTop: '1px solid #E8E8E8',
  },
  button: {
    marginTop: 10,
    marginBottom: 8,
    height: 40,
  },
});

export const SignIn: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, setError } = useForm<SignInFormType>({
    mode: 'onChange',
    resolver: yupResolver(signInFormSchema),
  });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [, setCookie] = useCookies(['token']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const onSubmit: SubmitHandler<SignInFormType> = (body) => {
    setDisabled(true);
    blogApi
      .signIn(body)
      .then((response: UserResponseType) => {
        const { user } = response;
        setCookie('token', user.token, { path: '/' });
        dispatch(logIn(response));
        history.push('/');
      })
      .catch((error: AxiosError<ServerValidationErrorsType>): void => {
        setDisabled(false);
        if (error.response) {
          setError('email', { type: 'server validation', message: '' });
          setError('password', { type: 'server validation', message: 'Email or password is invalid' });
        }
      });
  };

  const inputFields = signInFormFields.map((field: FormFieldType<SignInFieldNameType>) => {
    const { name } = field;
    return <FormField {...field} ref={register} error={errors[name]} />;
  });

  return (
    <div className={styles.formField}>
      <h2 className={styles.header}>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {inputFields}
        <Button className={classes.button} disabled={disabled} type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <span className={styles.signUp}>
        Don’t have an account?
        <Link to="/sign-up"> Sign Up.</Link>
      </span>
    </div>
  );
};
