import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PizzaItem, SearchPizzaParams } from '../types';
import { FetchPizza } from '../types';

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
