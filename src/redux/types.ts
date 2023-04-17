import { SortPropertyEnum, Status } from './enumParams';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum; //'title' | 'rating' | 'price';
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
  currentPage: number;
}

export type SearchPizzaParams = {
  category: string;
  sortType: string;
  search: string;
  currentPage: string;
};

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export interface PizzaSliceState {
  items: PizzaItem[];
  item: any;
  status: Status;
}

export type FetchPizza = {
  id: string;
};
