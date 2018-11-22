import { createStore } from 'easy-peasy';

import orderState from './order';

const store = createStore({
  burgerBuilder: null,
  order: orderState,
  auth: null
});

export default store;
