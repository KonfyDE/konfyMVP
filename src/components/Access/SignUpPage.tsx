import React from 'react';
import { AccessPage } from './AccessPage';
import { SignUpForm } from './SignUpForm';

export const SignUpPage: React.FC = () => {
  return (
    <AccessPage
      formTitle={'Create a new account'}
      linkTo={'/signin'}
      linkText={'login to an existing account'}
      formComponent={SignUpForm}
    />
  );
};
