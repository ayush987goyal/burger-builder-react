import { action, thunk } from 'easy-peasy';
import axios from '../axios-orders';

export default {
  orders: [],
  loading: false,
  purchased: false,
  // actions
  purchaseInit: action(state => {
    state.purchased = false;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  purchaseBurgerSuccess: action((state, { orderId, orderData }) => {
    const newOrder = { ...orderData, id: orderId };
    state.loading = false;
    state.purchased = true;
    state.orders = state.orders.concat(newOrder);
  }),

  purchaseBurger: thunk(async (actions, { token, orderData }) => {
    actions.setLoading(true);
    try {
      const response = await axios.post('/orders.json?auth=' + token, orderData);
      actions.purchaseBurgerSuccess({ orderId: response.data.name, orderData });
    } catch (error) {
      actions.setLoading(false);
    }
  }),

  fetchOrdersSuccess: action((state, payload) => {
    state.loading = false;
    state.orders = payload;
  }),

  fetchOrders: thunk(async (actions, { token, userId }) => {
    actions.setLoading(true);
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
      actions.fetchOrdersSuccess(fetchedOrders);
    } catch (error) {
      actions.setLoading(false);
    }
  })
};
