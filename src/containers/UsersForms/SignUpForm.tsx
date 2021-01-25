import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, Button } from '@material-ui/core';

import { signUpFormSchema } from './yupSchemas';
import blogApi from '../../service/api';
import { logIn } from '../../redux/actions/userActions';
import formErrorHandler from '../../tools/formServerErrorHandler';

import FormField from './FormField';

import type {
  SignUpFormType,
  ServerValidationErrorsType,
  FormErrorType,
  SignUpFieldNameType,
  UserResponseType,
  FormFieldType,
} from '../../@types/index';

import { signUpFormFields } from './usersFormsProps';
import styles from './UsersForms.module.scss';

const useStyles = makeStyles({
  label: {
    marginTop: 21,
    marginBottom: 21,
    paddingTop: 8,
    fontSize: 14,
    color: '#595959',
    borderTop: '1px solid #E8E8E8',
  },
  button: {
    marginBottom: 8,
    height: 40,
  },
});

export const SignUp: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, setError } = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: yupResolver(signUpFormSchema),
  });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [, setCookie] = useCookies(['token']);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const onSubmit: SubmitHandler<SignUpFormType> = (body) => {
    setDisabled(true);
    blogApi
      .signUp(body)
      .then((response: UserResponseType) => {
        const { user } = response;
        setCookie('token', user.token, { path: '/' });
        dispatch(logIn(response));
        history.push('/');
      })
      .catch((error: AxiosError<ServerValidationErrorsType>): void => {
        setDisabled(false);
        if (error.response) {
          const { data } = error.response;
          formErrorHandler(data).forEach(({ name, type, message }: FormErrorType<SignUpFieldNameType>) => {
            setError(name, { type, message });
          });
        }
      });
  };

  const inputFields = signUpFormFields.map((field: FormFieldType<SignUpFieldNameType>) => {
    const { name } = field;
    return <FormField {...field} ref={register} error={errors[name]} />;
  });

  return (
    <div className={styles.formField}>
      <h2 className={styles.header}>Create new account</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {inputFields}
        <FormControlLabel
          className={classes.label}
          control={<Checkbox color="primary" inputRef={register} required />}
          inputRef={register}
          label="I agree to the processing of my personal information"
        />
        <Button className={classes.button} disabled={disabled} type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
      <span className={styles.signUp}>
        Already have an account?
        <Link to="/sign-in"> Sign in.</Link>
      </span>
    </div>
  );
};
