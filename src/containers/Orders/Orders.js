import React, { useEffect } from 'react';
import { useStore, useActions } from 'easy-peasy';
import axios from '../../axios-orders';

import Order from './../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = () => {
  const { orders, loading } = useStore(state => state.order);
  const { token, userId } = useStore(state => state.auth);
  const fetchOrders = useActions(actions => actions.order.fetchOrders);

  useEffect(() => {
    fetchOrders({ token, userId });
  }, [token, userId, fetchOrders]);

  let ordersRender = <Spinner />;
  if (!loading) {
    ordersRender = (
      <div>
        {orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
  return ordersRender;
};

export default withErrorHandler(Orders, axios);
