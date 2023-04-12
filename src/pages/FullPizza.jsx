import { useEffect, uaeState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();
  const fetchItem = async () => {
    try {
      const { data } = await axios.get(
        'https://6420515725cb65721046ecff.mockapi.io/items/' + id,
      );
      setPizza(data);
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
