import { CartItem } from '../redux/types';

export const calcTotatPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

export const calcTotatCount = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};
