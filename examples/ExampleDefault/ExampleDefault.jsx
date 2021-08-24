/* eslint no-console: 0 */

import React, { useCallback } from 'react';
import { Formik } from 'formik';

/* eslint-disable-next-line import/no-extraneous-dependencies */
import emailValidator from 'email-validator';

import FormContent from './FormContent';

import CopyAnchor from '../share/CopyAnchor';

const INIT_VALUES = {
  emails: ['test@email.com', 'test2@example.com', 'notEmail'],
};

/**
 * Formik validation
 */
const handleValidate = (values) => {
  const errors = {};

  /* validate emails format */
  let hasInvalid = false;
  const emailsError = [];
  const { emails } = values;

  emails.forEach((email, index) => {
    // Check format valid
    if (!emailValidator.validate(email)) {
      hasInvalid = true;
      emailsError[index] = 'Invalid';
    }
  });
  if (hasInvalid) {
    errors.emails = emailsError;
  }

  return errors;
};

const ExampleDefault = () => {
  const handleFormSubmit = useCallback((values) => {
    console.log('handleFormSubmit values', values);
    return false;
  }, []);

  return (
    <>
      <h2>
        Example of integrated with Formik
        <CopyAnchor hashTag="example-with-formik" />
      </h2>
      <p>
        This is an example about emails input
        <br />
        Check the <b>dev console</b> to see <b>formikContext</b>
      </p>

      <Formik
        initialValues={INIT_VALUES}
        initialErrors={handleValidate(INIT_VALUES)}
        onSubmit={handleFormSubmit}
        validate={handleValidate}
      >
        <FormContent />
      </Formik>
    </>
  );
};

export default ExampleDefault;
