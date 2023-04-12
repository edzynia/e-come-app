import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { category, sortType, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6420515725cb65721046ecff.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortType}&order=asc${search}`,
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('There are no pizzas here');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);

export const fetchPizza = createAsyncThunk(
  'pizzas/fetchPizza',
  async (params, thunkAPI) => {
    const { id } = params;
    const { data } = await axios.get(
      `https://6420515725cb65721046ecff.mockapi.io/items/${id}`,
    );

    if (!data) {
      return thunkAPI.rejectWithValue('There are no pizza here');
    }
    return thunkAPI.fulfillWithValue(data);
  },
);

const initialState = {
  items: [],
  item: {},
  status: 'loading', //loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItem(state, action) {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = 'success';
    });
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItem } = pizzaSlice.actions;
export default pizzaSlice.reducer;
