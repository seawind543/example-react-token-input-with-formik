import type { FormikTokenValue } from '../types/token';

const getTokenEditableValue = (
  formikTokenValue: FormikTokenValue
): FormikTokenValue['fieldValue'] => {
  return formikTokenValue.fieldValue;
};

export default getTokenEditableValue;
