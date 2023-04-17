import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type SearchPizzaParams = {
  category: string;
  sortType: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { category, sortType, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://6420515725cb65721046ecff.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortType}&order=asc${search}`,
    );
    return data;
  },
);

type FetchPizza = {
  id: string;
};
export const fetchPizza = createAsyncThunk(
  'pizzas/fetchPizza',
  async (params: FetchPizza) => {
    const { id } = params;
    const { data } = await axios.get(
      `https://6420515725cb65721046ecff.mockapi.io/items/${id}`,
    );
    return data;
  },
);

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  item: any;
  status: Status;
}

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
