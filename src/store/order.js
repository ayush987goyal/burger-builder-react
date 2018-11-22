import { effect } from 'easy-peasy';
import axios from '../axios-orders';

export default {
  orders: [],
  loading: false,
  purchased: false,
  // actions
  purchaseInit: (state, payload) => {
    state.purchased = false;
  },

  setLoading: (state, payload) => {
    state.loading = payload;
  },

  purchaseBurgerSuccess: (state, { orderId, orderData }) => {
    const newOrder = { ...orderData, id: orderId };
    state.loading = false;
    state.purchased = true;
    state.orders = state.orders.concat(newOrder);
  },

  purchaseBurger: effect(async (dispatch, { token, orderData }) => {
    dispatch.order.setLoading(true);
    try {
      const response = await axios.post('/orders.json?auth=' + token, orderData);
      dispatch.order.purchaseBurgerSuccess({ orderId: response.data.name, orderData });
    } catch (error) {
      dispatch.order.setLoading(false);
    }
  }),

  fetchOrdersSuccess: (state, payload) => {
    state.loading = false;
    state.orders = payload;
  },

  fetchOrders: effect(async (dispatch, { token, userId }) => {
    dispatch.order.setLoading(true);
    const queryparams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    try {
      const response = await axios.get('/orders.json' + queryparams);
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }
      dispatch.order.fetchOrdersSuccess(fetchedOrders);
    } catch (error) {
      dispatch.order.setLoading(false);
    }
  })
};
