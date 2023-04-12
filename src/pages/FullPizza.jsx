import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPizza } from '../redux/slices/pizzaSlice';

const FullPizza = () => {
  const dispatch = useDispatch();
  const singlePizza = useSelector((state) => state.pizza.item);
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      dispatch(fetchPizza({ id }));
      setPizza(singlePizza);
    } catch (error) {
      console.warn(error);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>
        This hook returns the current location object. This can be useful if
        you'd like to perform some side effect whenever the current location
        changes.
      </p>
      <h4>SEK {pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
