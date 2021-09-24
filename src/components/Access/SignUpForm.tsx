import React, { FormEvent } from 'react';
import { UserType } from '../../types';

type Props = {
  type: UserType;
};

/**
 * @remarks While `SignUpForm` and `SignInForm` share most of their code, this would most definitely not be the case in real world conditions. This is why I kept them seperate.
 */
export const SignUpForm: React.FC<Props> = ({ type }) => {
  const idEmail = `email-${type}`;
  const idPassword = `password-${type}`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Welcome to knowbuddy!');
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="type" value={type} />
      <div className="form-row">
        <label className="sr-only" htmlFor={idEmail}>
          Email
        </label>
        <input id={idEmail} type="email" placeholder="E-mail Address" />
      </div>
      <div className="form-row">
        <label className="sr-only" htmlFor={idPassword}>
          Password
        </label>
        <input id={idPassword} type="password" placeholder="Password" />
      </div>
      <div className="signup-button__wrapper">
        <button className="btn btn-primary">Sign Up</button>
      </div>
    </form>
  );
};
