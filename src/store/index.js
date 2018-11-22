import { createStore } from 'easy-peasy';

import burgerBuilderState from './burgerBuilder';
import orderState from './order';
import authState from './auth';

const store = createStore({
  burgerBuilder: burgerBuilderState,
  order: orderState,
  auth: authState
});

export default store;
