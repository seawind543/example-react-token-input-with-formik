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

const handleTokenValueValidate = (formikTokenValue: FormikTokenValue) => {
  return formikTokenValue.fieldError; // The error from formik
};

// type TokenInputProps<ValueType, ErrorType> = JSX.LibraryManagedAttributes<
//   typeof TokenInput,
//   React.ComponentProps<typeof TokenInput>
// >;
// type Test = TokenInputProps<string, string>['onGetTokenDisplayLabel'];

// type Props<ValueType> = {
//   name: string;
// } & Partial<TokenInputProps<ValueType, string>>;
type Props<ValueType> = {
  name: string;
  onPreprocess?: TokenInputProps<ValueType, string>['onPreprocess'];
};

function FormikTokenInput<ValueType>({
  name: filedName,
  ...props
}: Props<ValueType>) {
  const { tokenValues, handleTokenValuesChange } = useTokenValues(filedName);

  return (
    <TokenInput
      /**
       * Append additional settings for TokenInput,
       * such as `className`
       */
      {...props}
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
