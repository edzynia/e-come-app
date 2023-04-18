import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// import { fetchPizza } from '../redux/actions/asyncActions';

const FullPizza: React.FC = () => {
  // const dispatch = useDispatch();
  // const { item: singlePizza } = useSelector((state) => state.pizza);
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  const fetchItem = async () => {
    // dispatch(fetchPizza({ id }));
    // setPizza(singlePizza);

    try {
      const { data } = await axios.get(
        `https://6420515725cb65721046ecff.mockapi.io/items/${id}`,
      );
      setPizza(data);
    } catch (error) {
      console.warn(error);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className='container'>
      <img className='pizza-block__image' src={pizza.imageUrl} alt='Pizza' />
      <h4 className='pizza-block__title'>{pizza.title}</h4>
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
