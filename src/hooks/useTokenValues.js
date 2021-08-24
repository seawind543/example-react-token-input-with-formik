// @flow
import { useState, useEffect, useCallback } from 'react';
import { useField } from 'formik';

import buildFormikTokenValue from '../utils/buildFormikTokenValue';

const normolizeFormikTokenValues = (
  fieldValues, // string[],
  fieldErrors // string[]
) => {
  const tokenValues = fieldValues.map((fieldValue, index) => {
    const fieldError = fieldErrors[index];
    return buildFormikTokenValue(fieldValue, fieldError);
  });

  return tokenValues;
};

const denormolizeFormikTokenValues = (tokenValues) => {
  const fieldValues = tokenValues.map((tokenValue) => tokenValue.fieldValue);
  return fieldValues;
};

const EMPTY_FIELD_ERRORS = [];

const useTokenValues = (filedName) => {
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
