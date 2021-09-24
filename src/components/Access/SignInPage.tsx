import React from 'react';
import { AccessPage } from './AccessPage';
import { SignInForm } from './SignInForm';

export const SignInPage: React.FC = () => {
  return (
    <AccessPage
      formTitle="Sign in to your account"
      linkTo="/signup"
      linkText="create a new account"
      formComponent={SignInForm}
    />
  );
};
