import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className='cart cart--empty'>
      <h2>
        Your cart is empty <span>😕</span>
      </h2>
      <p>
        You probably haven't ordered pizza yet.
        <br />
        <Link to='/'>
          <span>To order pizza, go to the main page.</span>
        </Link>
      </p>
      <img src={cartEmptyImg} alt='Empty cart' />
      <Link to='/' className='button button--black'>
        <span>Go Back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
