import React from 'react';
import styles from './CatalogPage.module.scss';
import { CustomSelect } from './components/CustomSelect';
import { ProductCard } from '../../shared/components/ProductCard';
import { Pagination } from './components/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import { useCatalogProducts } from '../../shared/hooks/useCatalogProducts';
import { SkeletonCardLoader } from '../../shared/components/SkeletonCardLoader';

const PAGE_TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, isLoading, hasError, currentCategory } =
    useCatalogProducts();

  const SORT_TO_PARAM: Record<string, string> = {
    Newest: 'age',
    Alphabetically: 'title',
    Cheapest: 'price',
  };

  const PARAM_TO_SORT: Record<string, string> = {
    age: 'Newest',
    title: 'Alphabetically',
    price: 'Cheapest',
  };

  const currentSortParam = searchParams.get('sort') || 'age';
  const currentSortLabel = PARAM_TO_SORT[currentSortParam] || 'Newest';

  const currentPerPage = searchParams.get('perPage') || '16';

  const handleSortChange = (newLabel: string) => {
    const newParams = new URLSearchParams(searchParams);
    const paramValue = SORT_TO_PARAM[newLabel];

    if (paramValue && paramValue !== 'age') {
      newParams.set('sort', paramValue);
    } else {
      newParams.delete('sort');
    }

    newParams.delete('page');

    setSearchParams(newParams);
  };

  const handlePerPageChange = (newPerPage: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (newPerPage !== 'All') {
      newParams.set('perPage', newPerPage);
    } else {
      newParams.delete('perPage');
    }

    newParams.delete('page');

    setSearchParams(newParams);
  };

  const itemsPerPageNumber =
    currentPerPage === 'All' ? products.length : Number(currentPerPage);

  const sortedProducts = [...products].sort((a, b) => {
    if (currentSortParam === 'age') {
      return b.year - a.year;
    }

    if (currentSortParam === 'price') {
      return a.price - b.price;
    }

    if (currentSortParam === 'title') {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  const currentPageNumber = Number(searchParams.get('page')) || 1;

  const startIndex = (currentPageNumber - 1) * itemsPerPageNumber;
  const endIndex = startIndex + itemsPerPageNumber;

  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <span className={styles.homeIcon} aria-label="Home" />
        </Link>
        <span className={styles.rightArrowIcon} aria-label="Right arrow" />
        <p className={styles.breadcrumbsTitle}>{currentCategory}</p>
      </div>

      <h1 className={styles.title}>
        {PAGE_TITLES[currentCategory] || currentCategory}
      </h1>
      <p className={styles.modelsCount}>{products.length} models</p>

      <div className={styles.filters}>
        <CustomSelect
          label="Sort by"
          options={['Newest', 'Alphabetically', 'Cheapest']}
          value={currentSortLabel}
          onChange={handleSortChange}
        />

        <CustomSelect
          label="Items on page"
          options={['4', '8', '16', 'All']}
          value={currentPerPage}
          onChange={handlePerPageChange}
        />
      </div>

      <div className={styles.productsGrid}>
        {hasError && <div>Something went wrong...</div>}
        {products.length === 0 && !isLoading && (
          <div>There are no {currentCategory} yet</div>
        )}

        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCardLoader key={i} />
          ))}

        {!isLoading && products.length === 0 && (
          <p>There are no {currentCategory} yet</p>
        )}

        {!isLoading &&
          products.length > 0 &&
          visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {products.length > itemsPerPageNumber && (
        <div className={styles.pagination}>
          <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPageNumber}
            currentPage={currentPageNumber}
          />
        </div>
      )}
    </main>
  );
};
