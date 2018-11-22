import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'easy-peasy';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

const Checkout = props => {
  const ings = useStore(state => state.burgerBuilder.ingredients);
  const purchased = useStore(state => state.order.purchased);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
  return summary;
};

export default Checkout;
