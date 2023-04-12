import React, { useEffect, useContext, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductCard from '../components/PizzaBlock';
import { SearchContext } from '../App';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  stateFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';
import { sortOptions } from '../components/Sort';

const Home = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(stateFilters);
  const { items, status } = useSelector(selectPizza);

  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchData = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.sortProperty;
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortType,
        search,
        currentPage,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortOptions.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      if (queryString) {
        navigate(`?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items
    ?.filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <ProductCard key={obj.id} {...obj} />);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>All Pizzas</h2>
      {status === 'error' ? (
        <div className='cart cart--empty'>
          <h2>
            Sorry, an error has occurred <span>😕</span>
          </h2>
          <p>
            Try again late.
            <br />
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
