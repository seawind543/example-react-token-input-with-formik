import React from 'react';
import PropTypes from 'prop-types';

import TokenInput from 'react-customize-token-input';
import 'react-customize-token-input/dist/react-customize-token-input.original.css';

import useTokenValues from './hooks/useTokenValues';
import buildFormikTokenValue from './utils/buildFormikTokenValue';
import getTokenEditableValue from './utils/getTokenEditableValue';

const handleBuildTokenValue = (newInputValue) => {
  return buildFormikTokenValue(newInputValue, undefined);
};

const handleGetTokenDisplayLabel = (tokenValue) => {
  return tokenValue.fieldValue;
};

const handleTokenValueValidate = (tokenValue) => {
  return tokenValue.fieldError; // The error from formik
};

const FormikTokenInput = ({ name: filedName, ...props }) => {
  const { tokenValues, handleTokenValuesChange } = useTokenValues(filedName);

  return (
    <TokenInput
      tokenValues={tokenValues}
      onTokenValuesChange={handleTokenValuesChange}
      onBuildTokenValue={handleBuildTokenValue}
      onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
      onGetTokenEditableValue={getTokenEditableValue}
      // For make style on `error`
      onTokenValueValidate={handleTokenValueValidate}
      /**
       * Append additional settings for TokenInput,
       * such as `className`
       */
      {...props}
    />
  );
};

FormikTokenInput.propTypes = {
  /**
   * Formik field name.
   * Should point to an array of string data
   */
  name: PropTypes.string.isRequired,
};

export default FormikTokenInput;
