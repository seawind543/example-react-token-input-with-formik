/* eslint no-console: 0 */

import React from 'react';
import { useFormikContext } from 'formik';
import FormikTokenInput from '../../src';

const handlePreprocess = (inputValues: string[]) => {
  // Remove blanks from input strings' header and tail
  return inputValues.map((inputValue) => inputValue.trim());
};

function FormContent() {
  const formikContext = useFormikContext();

  console.log('formikContext', formikContext);

  const { dirty, isValid, isSubmitting, submitForm } = formikContext;
  const disableSubmitButton = !dirty || !isValid || isSubmitting;

  return (
    <>
      <FormikTokenInput name="emails" onPreprocess={handlePreprocess} />
      <button disabled={disableSubmitButton} onClick={submitForm}>
        Submit
      </button>
    </>
  );
}

export default FormContent;
