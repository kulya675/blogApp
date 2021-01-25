import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './ResponseStatus.module.scss';

type ResponseStatusPropsType = {
  loading: boolean;
  errorStatus: number | null;
};

export const ResponseStatus: React.FC<ResponseStatusPropsType> = ({ children, loading, errorStatus }) => {
  return (
    <>
      {errorStatus && (
        <Alert severity="error" className={styles.alert} variant="filled">
          {`Oops. Something went wrong with status ${errorStatus}`}
        </Alert>
      )}
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      ) : (
        children
      )}
    </>
  );
};
