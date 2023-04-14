type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (id: number) => void;
};
const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onChangeCategory,
}) => {
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
