import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

import { Snackbar, Button, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FormField from './FormField';
import { profileFormFields } from './usersFormsProps';

import { userSelector } from '../../redux/selectors';
import { updateUser } from '../../redux/actions/userActions';

import { ProfileFormschema } from './yupSchemas';
import formServerErrorHandler from '../../tools/formServerErrorHandler';

import blogApi from '../../service/api';

import type {
  ProfileFormType,
  FormErrorType,
  ProfileFieldNameType,
  ServerValidationErrorsType,
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

export const Profile: React.FC = () => {
  const { user } = useSelector(userSelector);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, handleSubmit, errors, setError } = useForm<ProfileFormType>({
    mode: 'onChange',
    resolver: yupResolver(ProfileFormschema),
    defaultValues: {
      email: user.email,
      username: user.username,
    },
  });
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const classes = useStyles();

  const transformSubmitedData = (data: ProfileFormType): ProfileFormType => {
    const newData = {} as ProfileFormType;
    const dataKeys = Object.keys(data) as Array<keyof typeof data>;
    dataKeys.forEach((key) => {
      if (data[key]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newData[key] = data[key];
      }
    });
    return newData;
  };

  const onSubmit: SubmitHandler<ProfileFormType> = (body: ProfileFormType) => {
    setDisabled(true);
    const newBody = transformSubmitedData(body);
    blogApi
      .updateProfile(newBody, cookies.token)
      .then((response) => {
        setSnackbarOpen(true);
        setDisabled(false);
        dispatch(updateUser(response));
      })
      .catch((error: AxiosError<ServerValidationErrorsType>): void => {
        setDisabled(false);
        if (error.response) {
          const { data } = error.response;
          formServerErrorHandler(data).forEach(({ name, type, message }: FormErrorType<ProfileFieldNameType>) => {
            setError(name, { type, message });
          });
        }
      });
  };

  const snackbarCloseHandler = () => {
    setSnackbarOpen(false);
  };

  const inputFields = profileFormFields.map((field: FormFieldType<ProfileFieldNameType>) => {
    const { name } = field;
    return <FormField {...field} ref={register} error={errors[name]} />;
  });

  return (
    <div className={styles.formField}>
      <h2 className={styles.header}>Edit Profile</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {inputFields}
        <Button className={classes.button} disabled={disabled} type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={snackbarCloseHandler}>
        <Alert onClose={snackbarCloseHandler} severity="success" variant="filled">
          Successfully updated!
        </Alert>
      </Snackbar>
    </div>
  );
};
