import type { ServerValidationErrorsType, FormErrorType } from '../@types/index';

// FIXME: Переписать типизацию функции.

export default ({ errors }: ServerValidationErrorsType): Array<FormErrorType> => {
  const errorsArr = [] as Array<FormErrorType>;
  const errorsFieldNames = Object.keys(errors) as Array<keyof typeof errors>;
  errorsFieldNames.forEach((errorFieldName): void => {
    const error = {
      type: 'server validation error',
      name: errorFieldName,
      message: errors[errorFieldName].join(', '),
    };
    errorsArr.push(error);
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return errorsArr;
};
