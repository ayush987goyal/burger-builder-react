import { effect } from 'easy-peasy';
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
  addIngredient: (state, ingredientName) => {
    state.ingredients = {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] + 1
    };
    state.totalPrice += INGREDIENT_PRICES[ingredientName];
    state.building = true;
  },

  removeIngredient: (state, ingredientName) => {
    state.ingredients = {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] - 1
    };
    state.totalPrice -= INGREDIENT_PRICES[ingredientName];
    state.building = true;
  },

  setIngredients: (state, ingredients) => {
    state.ingredients = ingredients;
    state.totalPrice = 4;
    state.error = false;
    state.building = false;
  },

  fetchIngredientsFailed: state => {
    state.error = true;
  },

  initIngredients: effect(async dispatch => {
    try {
      const response = await axios.get('/ingredients.json');
      dispatch.burgerBuilder.setIngredients(response.data);
    } catch (error) {
      dispatch.burgerBuilder.fetchIngredientsFailed();
    }
  })
};
