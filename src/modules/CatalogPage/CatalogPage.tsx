import React, { useState } from 'react';
import styles from './CatalogPage.module.scss';
import { useHomePageProducts } from '../../shared/hooks/useHomePageProducts';
import { CustomSelect } from './components';

export const CatalogPage = () => {
  const [sortValue, setSortValue] = useState('Newest');
  const [perPageValue, setPerPageValue] = useState('16');
  const { phonesList } = useHomePageProducts();

  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span className={styles.homeIcon} aria-label="Home" />
        <span className={styles.rightArrowIcon} aria-label="Right arrow" />
        <p className={styles.breadcrumbsTitle}>Phones</p>
      </div>

      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.modelsCount}>{phonesList.length} models</p>

      <div className={styles.filters}>
        <CustomSelect
          label="Sort by"
          options={['Newest', 'Alphabetically', 'Cheapest']}
          value={sortValue}
          onChange={setSortValue}
        />

        <CustomSelect
          label="Items on page"
          options={['4', '8', '16', 'All']}
          value={perPageValue}
          onChange={setPerPageValue}
        />
      </div>

      <div className={styles.productsGrid}></div>
    </main>
  );
};
