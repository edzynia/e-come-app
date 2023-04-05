const Categories = ({ categoryId, onChangeCategory }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, id) => (
          <li
            key={category}
            onClick={() => onChangeCategory(id)}
            className={categoryId === id ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
