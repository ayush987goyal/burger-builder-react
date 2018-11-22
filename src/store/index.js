import { createStore } from 'easy-peasy';

import burgerBuilderState from './burgerBuilder';
import orderState from './order';

const store = createStore({
  burgerBuilder: burgerBuilderState,
  order: orderState,
  auth: null
});

export default store;
