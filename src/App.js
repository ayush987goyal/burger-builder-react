import React, { useEffect, Suspense, lazy } from 'react';
import { useStore, useActions } from 'easy-peasy';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';

const asyncCheckout = lazy(() => import('./containers/Checkout/Checkout'));

const asyncOrders = lazy(() => import('./containers/Orders/Orders'));

const asyncAuth = lazy(() => import('./containers/Auth/Auth'));

const App = () => {
  const isAuthenticated = useStore(state => state.auth.token !== null);
  const onTryAutoSignup = useActions(actions => actions.auth.authCheckState);

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </Layout>
  );
};

export default withRouter(App);
