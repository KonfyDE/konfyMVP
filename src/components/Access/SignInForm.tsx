import React, { FormEvent } from 'react';

/**
 * @remarks While `SignUpForm` and `SignInForm` share most of their code, this would most definitely not be the case in real world conditions. This is why I kept them seperate.
 */
export const SignInForm: React.FC = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Welcome to knowbuddy!');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input id="email" type="email" placeholder="E-mail Address" />
      </div>
      <div className="form-row">
        <label className="sr-only" htmlFor="password">
          Password
        </label>
        <input id="password" type="password" placeholder="Password" />
      </div>
      <div className="signup-button__wrapper">
        <button className="btn btn-primary">Sign In</button>
      </div>
    </form>
  );
};
