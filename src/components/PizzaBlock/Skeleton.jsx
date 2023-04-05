import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <circle cx='138' cy='139' r='125' />
    <rect x='15' y='272' rx='7' ry='7' width='250' height='25' />
    <rect x='15' y='311' rx='10' ry='10' width='250' height='88' />
  </ContentLoader>
);

export default Skeleton;
