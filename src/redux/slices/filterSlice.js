import { createSlice } from '@reduxjs/toolkit';

// interface CounterState {
//   value: number
// }

const initialState = {
  categoryId: 0,
  sort: { name: 'popularity', sortProperty: 'rating' },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setTypeSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.setCategoryId);
    },
  },
});

export const { setCategoryId, setTypeSort, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;