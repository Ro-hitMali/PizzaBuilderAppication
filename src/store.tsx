import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PizzaState {
  quantity: number;
}

interface CartItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialPizzaState: PizzaState = {
  quantity: 1,
};

const initialCartState: CartState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialPizzaState,
  reducers: {
    selectPizzaQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    incrementPizzaQuantity: (state) => {
      state.quantity++;
    },
    decrementPizzaQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity--;
      }
    },
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { selectPizzaQuantity, incrementPizzaQuantity, decrementPizzaQuantity } = pizzaSlice.actions;
export const { addToCart } = cartSlice.actions;

export const selectPizzaQuantityState = (state: RootState) => state.pizza.quantity;
export const selectCartItems = (state: RootState) => state.cart.items;

export const store = configureStore({
  reducer: {
    pizza: pizzaSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
