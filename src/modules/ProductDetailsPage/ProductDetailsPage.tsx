import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDetailsProduct } from '../../shared/hooks/useDetailsProduct';
import classNames from 'classnames';

export const ProductDetailsPage = () => {
  const { product, isLoading, hasError } = useDetailsProduct();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError || !product) {
    return <h1>Product was not found</h1>;
  }

  const activeImage = selectedImage || product.images[0];
  const activeColor = selectedColor || product.colorsAvailable[0];

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
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map(image => (
              <img
                src={image}
                key={image}
                className={classNames(styles.miniatureImage, {
                  [styles.selected]: image === activeImage,
                })}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={activeImage} />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.colors}>
            {product.colorsAvailable.map(color => (
              <label
                className={styles.colorLabel}
                key={color}
                htmlFor={`color-${color}`}
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={`color-${color}`}
                  className={styles.hiddenRadio}
                  checked={color === activeColor}
                  onChange={() => setSelectedColor(color)}
                />

                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                ></span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
