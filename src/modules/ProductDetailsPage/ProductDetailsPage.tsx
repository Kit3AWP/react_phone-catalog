import React, { useEffect } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDetailsProduct } from '../../shared/hooks/useDetailsProduct';
// eslint-disable-next-line max-len
import { useProductConfigurator } from '../../shared/hooks/useProductConfigurator';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
// eslint-disable-next-line max-len
import { ProductPageSkeleton } from '../../shared/components/ProductPageSkeleton';
import { ProductGallery } from './components/Gallery';
import { RightTopSection } from './components/RightTopSection';
import { BottomSection } from './components/BottomSection';
import { getProductDetailsById } from '../../shared/hooks/products';

export const ProductDetailsPage: React.FC = () => {
  const { category = 'phones', productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const { recommendedProducts, navigate } = useProductConfigurator();

  const {
    product,
    isLoading,
    hasError,
    setIsLoading,
    setHasError,
    setProduct,
  } = useDetailsProduct();

  useEffect(() => {
    if (!productId) {
      return;
    }

    let isMounted = true;

    setIsLoading(true);
    setHasError(false);

    getProductDetailsById(category, productId)
      .then(data => {
        if (isMounted) {
          setProduct(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category, productId, setHasError, setIsLoading, setProduct]);

  if (!isLoading && (!product || hasError)) {
    return <ProductPageSkeleton />;
  }

  if (!product || hasError) {
    return <div className={styles.notFound}>Product was not found</div>;
  }

  return (
    <main className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <span className={styles.homeIcon} aria-label="Home" />
        </Link>
        <span className={styles.rightArrowIcon} aria-label="Right arrow" />

        <Link to={`/${product.category}`} className={styles.categoryLink}>
          {product.category}
        </Link>
        <span className={styles.rightArrowIcon} aria-label="Right arrow" />

        <p className={styles.breadcrumbsTitle}>{product.name}</p>
      </div>

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <span className={styles.leftArrow} aria-label="Left arrow" />
        <span className={styles.backText}>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topSection}>
        <ProductGallery images={product.images} />

        <RightTopSection />
      </div>

      <BottomSection />

      <div className={styles.sliderSection}>
        <ProductsSlider
          title="You may also like"
          sliderId="recommended"
          products={recommendedProducts}
        />
      </div>
    </main>
  );
};
