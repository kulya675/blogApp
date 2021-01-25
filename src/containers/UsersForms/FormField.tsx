import React from 'react';
import { FieldError } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import styles from './UsersForms.module.scss';

type FormFieldPropType = {
  name: string;
  label: string;
  type?: string;
  error?: FieldError;
};

const useStyles = makeStyles({
  input: {
    height: 40,
    marginBottom: 24,
  },
});

const FormField = React.forwardRef<HTMLInputElement, FormFieldPropType>((props, ref) => {
  const { name, label, type, error } = props;
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.input}
        inputRef={ref}
        name={name}
        label={label}
        type={type}
        variant="outlined"
        error={!!error}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </>
  );
});

export default FormField;
