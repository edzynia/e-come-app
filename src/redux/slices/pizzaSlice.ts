import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchPizzas, fetchPizza } from '../actions/asyncActions';
import { PizzaItem, PizzaSliceState } from '../types';
import { Status } from '../enumParams';

const initialState: PizzaSliceState = {
  items: [],
  item: {},
  status: Status.LOADING, //loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<PizzaItem[]>) {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = Status.SUCCESS;
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItem } = pizzaSlice.actions;
export default pizzaSlice.reducer;
