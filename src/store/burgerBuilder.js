import { action, thunk } from 'easy-peasy';
import axios from '../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

export default {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: true,
  // actions
  addIngredient: action((state, ingredientName) => {
    state.ingredients = {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] + 1
    };
    state.totalPrice += INGREDIENT_PRICES[ingredientName];
    state.building = true;
  }),

  removeIngredient: action((state, ingredientName) => {
    state.ingredients = {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] - 1
    };
    state.totalPrice -= INGREDIENT_PRICES[ingredientName];
    state.building = true;
  }),

  setIngredients: action((state, ingredients) => {
    state.ingredients = ingredients;
    state.totalPrice = 4;
    state.error = false;
    state.building = false;
  }),

  fetchIngredientsFailed: action(state => {
    state.error = true;
  }),

  initIngredients: thunk(async actions => {
    try {
      const response = await axios.get('/ingredients.json');
      actions.setIngredients(response.data);
    } catch (error) {
      actions.fetchIngredientsFailed();
    }
  })
};
