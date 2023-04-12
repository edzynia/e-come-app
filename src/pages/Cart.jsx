import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';
import { clearItems, selectCart } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, totalCount } = useSelector(selectCart);
  const items = useSelector(selectCart).items;
  const onClickClear = () => {
    if (window.confirm('Are you sure that you want to clear a cart')) {
      return dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className='container container--cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2>Shopping Cart</h2>
          <div className='cart__clear' onClick={onClickClear}>
            <span>Clear cart?</span>
          </div>
        </div>
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}

        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              {' '}
              Total pizzas: <b>{totalCount} st.</b>{' '}
            </span>
            <span>
              {' '}
              Order total: <b> SEK {totalPrice}</b>{' '}
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              <span>Go back</span>
            </Link>
            <div className='button pay-btn'>
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
