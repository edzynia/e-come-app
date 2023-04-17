import React, { useEffect, useRef, useCallback } from 'react';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/SortPopup';
import ProductCard from '../components/PizzaBlock';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  stateFilters,
} from '../redux/slices/filterSlice';
import { selectPizza } from '../redux/slices/pizzaSlice';
import { fetchPizzas } from '../redux/actions/asyncActions';
import { sortOptions } from '../components/SortPopup';
import { SearchPizzaParams } from '../redux/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(stateFilters);
  const { items, status } = useSelector(selectPizza);

  const dispatch = useAppDispatch();
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
        currentPage: String(currentPage),
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1),
      ) as unknown as SearchPizzaParams;
      const sort = sortOptions.find(
        (obj) => obj.sortProperty === params.sortType,
      );
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortOptions[0],
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
    ?.filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <ProductCard key={obj.id} {...obj} />);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort value={sort} />
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
