import type { FormikTokenValue } from '../types/token';

const buildFormikTokenValue = (
  fieldValue: FormikTokenValue['fieldValue'],
  fieldError: FormikTokenValue['fieldError'],
): FormikTokenValue => {
  return {
    fieldValue,
    fieldError,
  };
};

export default buildFormikTokenValue;
