import React from 'react';

import { TextField, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import type { ArticleType } from '../../@types';

import styles from './ArticleFormFields.module.scss';

const useStyles = makeStyles({
  textField: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    fontSize: 16,
    lineHeight: 1.5,
  },
  button: {
    width: 200,
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 48,
  },
});

type ArticleFormFieldsPropsType = {
  onSubit: () => void;
  onTagsValuesChange: (event: any, value: any) => void;
  buttonDisabled: boolean;
  article: ArticleType | null;
  type: 'create' | 'edit';
};

export const ArticleFormFields = React.forwardRef<HTMLElement, ArticleFormFieldsPropsType>((props, ref) => {
  const { article, onSubit, type, onTagsValuesChange, buttonDisabled } = props;
  const classes = useStyles();

  if (type === 'edit' && article === null) {
    return <></>;
  }
  return (
    <div className={styles.formBody}>
      <h1 className={styles.header}>{type === 'edit' ? 'Edit article' : 'Create new article'}</h1>
      <form className={styles.form} onSubmit={onSubit}>
        <TextField
          className={classes.textField}
          InputProps={{ classes: { input: classes.input } }}
          defaultValue={article?.title}
          label="Title"
          color="primary"
          variant="outlined"
          name="title"
          inputRef={ref}
          required
        />
        <TextField
          className={classes.textField}
          InputProps={{ classes: { input: classes.input } }}
          defaultValue={article?.description}
          label="Short description"
          color="primary"
          variant="outlined"
          name="description"
          inputRef={ref}
          required
        />
        <TextField
          className={classes.textField}
          InputProps={{ classes: { input: classes.input } }}
          defaultValue={article?.body}
          label="Text"
          color="primary"
          multiline
          rows="6"
          variant="outlined"
          name="body"
          inputRef={ref}
          required
        />
        <Autocomplete
          renderInput={(params) => <TextField {...params} className={classes.textField} label="Tags" />}
          defaultValue={article?.tagList}
          options={[]}
          multiple
          freeSolo
          onChange={onTagsValuesChange}
        />
        <Button className={classes.button} disabled={buttonDisabled} type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
});
