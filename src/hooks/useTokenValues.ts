import { useState, useEffect, useCallback } from 'react';
import { useField } from 'formik';

import buildFormikTokenValue from '../utils/buildFormikTokenValue';

import type { FormikTokenValue } from '../types/token';

const normolizeFormikTokenValues = (
  fieldValues: FormikTokenValue['fieldValue'][],
  fieldErrors: FormikTokenValue['fieldError'] | FormikTokenValue['fieldError'][]
) => {
  const tokenValues = fieldValues.map((fieldValue, index) => {
    const fieldError = Array.isArray(fieldErrors)
      ? fieldErrors[index]
      : fieldErrors;
    return buildFormikTokenValue(fieldValue, fieldError);
  });

  return tokenValues;
};

const denormolizeFormikTokenValues = (tokenValues: FormikTokenValue[]) => {
  const fieldValues = tokenValues.map((tokenValue) => tokenValue.fieldValue);
  return fieldValues;
};

const EMPTY_FIELD_ERRORS: FormikTokenValue['fieldError'][] = [];

const useTokenValues = (filedName: string) => {
  const [, meta, helpers] = useField(filedName);
  const { value: fieldValues, error: fieldErrors = EMPTY_FIELD_ERRORS } = meta;

  const [tokenValues, setTokenValues] = useState(() =>
    normolizeFormikTokenValues(fieldValues, fieldErrors)
  );

  useEffect(() => {
    const newTokenValues = normolizeFormikTokenValues(fieldValues, fieldErrors);
    setTokenValues(newTokenValues);
  }, [fieldValues, fieldErrors]);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      const newFieldValues = denormolizeFormikTokenValues(newTokenValues);
      const { setTouched, setValue } = helpers;
      setTouched(true, false);
      setValue(newFieldValues);
    },
    [helpers]
  );

  return {
    tokenValues,
    handleTokenValuesChange,
  };
};

export default useTokenValues;
