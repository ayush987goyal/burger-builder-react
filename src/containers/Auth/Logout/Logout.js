import React, { useEffect } from 'react';
import { useAction } from 'easy-peasy';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const onLogout = useAction(actions => actions.auth.logout);

  useEffect(() => {
    onLogout();
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
