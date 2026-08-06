import React, { useEffect, useState } from 'react';
import { PromoSlider } from './components/Swiper/PromoSlider';
import styles from './HomePage.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { ProductsSlider } from './components/ProductsSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const getPhones = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('/api/products.json');
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Servers crashed', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPhones();
  }, []);

  const techOnly = products.filter(
    item =>
      (item.category === 'phones' || item.category === 'tablets') &&
      item.year >= 2022,
  );

  const sortedTech = [...techOnly].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    return b.price - a.price;
  });

  const seenModels = new Set();

  const visuallyUniqueTech = sortedTech.filter(item => {
    const baseModel = item.itemId.split('-').slice(0, -2).join('-');

    const modelWithColor = `${baseModel}-${item.color}`;

    if (seenModels.has(modelWithColor)) {
      return false;
    }

    seenModels.add(modelWithColor);

    return true;
  });

  const finalBrandNewModels = visuallyUniqueTech.slice(0, 16);

  const phonesModelsCount = products.filter(
    product => product.category === 'phones',
  );

  const tabletsModelsCount = products.filter(
    product => product.category === 'tablets',
  );

  const accessoriesModelsCount = products.filter(
    product => product.category === 'accessories',
  );

  const fullPriceProducts = products.filter(
    product => (product.fullPrice || 0) > product.price && product.year < 2022,
  );

  const sortedFullPrice = fullPriceProducts.sort(
    (a, b) => (b.fullPrice || 0) - b.price - ((a.fullPrice || 0) - a.price),
  );

  const seenDiscountModels = new Set();

  const hotDiscountProducts = sortedFullPrice.filter(item => {
    const baseModel = item.itemId.split('-').slice(0, -2).join('-');

    const modelWithColor = `${baseModel}-${item.color}`;

    if (seenDiscountModels.has(modelWithColor)) {
      return false;
    }

    seenDiscountModels.add(modelWithColor);

    return true;
  });

  const finalHotDiscounts = hotDiscountProducts.slice(0, 16);

  return (
    <div className={styles.container}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.banner}>
        <PromoSlider />
      </div>

      <ProductsSlider
        title="Brand new models"
        products={finalBrandNewModels}
        sliderId="brand"
        hideFullPrice={true}
      />

      <section className={styles.shopByCategory}>
        <h2 className={styles.shopByTitle}>Shop by category</h2>

        <div className={styles.imgLinks}>
          <Link to="/phones" className={styles.linkCard}>
            <img
              src="/img/Phones.png"
              alt="Phones"
              className={styles.cardImg}
            />
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <p className={styles.count}>{phonesModelsCount.length} models</p>
          </Link>
          <Link to="/tablets" className={styles.linkCard}>
            <img
              src="/img/Tablets.png"
              alt="Tablets"
              className={styles.cardImg}
            />
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <p className={styles.count}>{tabletsModelsCount.length} models</p>
          </Link>
          <Link to="/accessories" className={styles.linkCard}>
            <img
              src="/img/Accessories.png"
              alt="Accessories"
              className={styles.cardImg}
            />
            <div className={styles.descripton}>
              <h3 className={styles.categoryTitle}>Accessories</h3>
              <p className={styles.count}>
                {accessoriesModelsCount.length} models
              </p>
            </div>
          </Link>
        </div>
      </section>

      <ProductsSlider
        title="Hot prices"
        products={finalHotDiscounts}
        sliderId="hot"
      />
    </div>
  );
};
