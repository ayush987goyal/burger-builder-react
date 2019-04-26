import React, { useEffect } from 'react';
import { useActions } from 'easy-peasy';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const onLogout = useActions(actions => actions.auth.logout);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

export default Logout;
