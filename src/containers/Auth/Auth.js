import React, { useState, useEffect } from 'react';
import { useStore, useActions } from 'easy-peasy';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = () => {
  const { loading, error, authRedirectPath } = useStore(state => state.auth);
  const isAuthenticated = useStore(state => state.auth.token !== null);
  const buildingBurger = useStore(state => state.burgerBuilder.building);

  const { authUser: onAuth, setAuthRedirectPath: onSetAuthRedirectPath } = useActions(
    actions => actions.auth
  );

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const [state, setState] = useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(state.controls, {
      [controlName]: updateObject(state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, state.controls[controlName].validation),
        touched: true
      })
    });
    setState({ ...state, controls: updatedControls });
  };

  const submithandler = event => {
    event.preventDefault();
    onAuth({
      email: state.controls.email.value,
      password: state.controls.password.value,
      isSignup: state.isSignup
    });
  };

  const switchAuthModeHandler = () => {
    setState({ ...state, isSignup: !state.isSignup });
  };

  const formElementsArray = [];
  for (let key in state.controls) {
    formElementsArray.push({
      id: key,
      config: state.controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = <p>{error.message}</p>;
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submithandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {state.isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

export default Auth;
