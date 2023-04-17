import { CartItem } from '../redux/types';
import { calcTotatCount, calcTotatPrice } from './calcTotat';

export const getFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotatPrice(items);
  const totalCount = calcTotatCount(items);

  return {
    items: items as CartItem[],
    totalCount,
    totalPrice,
  };
};
