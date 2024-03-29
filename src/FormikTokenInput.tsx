import React from 'react';

import TokenInput, { type TokenInputProps } from 'react-customize-token-input';
import 'react-customize-token-input/dist/react-customize-token-input.original.css';

import useTokenValues from './hooks/useTokenValues';
import buildFormikTokenValue from './utils/buildFormikTokenValue';
import getTokenEditableValue from './utils/getTokenEditableValue';

import type { InputString, FormikTokenValue } from './types/token';

const handleBuildTokenValue = (newInputValue: InputString) => {
  return buildFormikTokenValue(newInputValue, undefined);
};

const handleGetTokenDisplayLabel = (formikTokenValue: FormikTokenValue) => {
  return getTokenEditableValue(formikTokenValue);
};

const handleTokenValueValidate = (
  formikTokenValue: FormikTokenValue,
): string | null | undefined => {
  return formikTokenValue.fieldError; // The error from formik
};

// Exclude the props that will be handled by FormikTokenInput
type RestOfTokenInputProps<ValueType> = Omit<
  TokenInputProps<ValueType, string>,
  | 'tokenValues'
  | 'onTokenValuesChange'
  | 'onBuildTokenValue'
  | 'onGetTokenDisplayLabel'
  | 'onGetTokenEditableValue'
  | 'onTokenValueValidate'
>;

/**
 * @template ValueType
 * @typedef {Object} FormikTokenInputProps
 */
// Method 1: By type Intersection
// type FormikTokenInputProps<ValueType> = {
//   /**
//    * @prop {string} name
//    * @description - Field name of formik
//    */
//   name: string;
// } & RestOfTokenInputProps<ValueType>;
// Method 2: By interface Extends
interface FormikTokenInputProps<ValueType>
  extends RestOfTokenInputProps<ValueType> {
  /**
   * @prop {string} name
   * @description - Field name of formik
   */
  name: string;
}

function FormikTokenInput(props: FormikTokenInputProps<FormikTokenValue>) {
  const { name: filedName, ...restProps } = props;

  const { tokenValues, handleTokenValuesChange } = useTokenValues(filedName);

  return (
    <TokenInput
      /**
       * Append additional settings for TokenInput,
       * such as `className`
       */
      {...(restProps as RestOfTokenInputProps<FormikTokenValue>)}
      tokenValues={tokenValues}
      onTokenValuesChange={handleTokenValuesChange}
      onBuildTokenValue={handleBuildTokenValue}
      onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
      onGetTokenEditableValue={getTokenEditableValue}
      // For make style on `error`
      onTokenValueValidate={handleTokenValueValidate}
    />
  );
}

export default FormikTokenInput;
