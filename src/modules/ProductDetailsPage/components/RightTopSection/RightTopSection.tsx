import React from 'react';
import styles from './RightTopSection.module.scss';
// eslint-disable-next-line max-len
import { useProductConfigurator } from '../../../../shared/hooks/useProductConfigurator';
import { useDetailsProduct } from '../../../../shared/hooks/useDetailsProduct';
import { useFavorites } from '../../../../shared/hooks/useFavorites';
import { Product } from '../../../../shared/types/Product';
import classNames from 'classnames';

export const RightTopSection = () => {
  const { product, hasError } = useDetailsProduct();

  const {
    colorsMap,
    handleColorChange,
    activeColor,
    activeCapacity,
    handleCapacityChange,
  } = useProductConfigurator();

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(item => item.id === product?.numericId);

  const onClickFav = () => {
    if (!product || !product.numericId) {
      return;
    }

    const productToSave: Product = {
      id: product.numericId,
      itemId: product.id,
      name: product.name,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      screen: product.screen,
      capacity: product.capacity,
      color: product.color,
      ram: product.ram,
      year: 2020,
      image: product.images[0],
      category: product.category,
    };

    toggleFavorite(productToSave);
  };

  if (hasError || !product) {
    return <h1>Product was not found</h1>;
  }

  return (
    <div className={styles.rightSection}>
      <div className={styles.configurator}>
        <div className={styles.configHeader}>
          <p className={styles.configTitle}>Available colors</p>
          <p className={styles.textId}>ID: {product.numericId} </p>
        </div>

        <div className={styles.colorsList}>
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
                onChange={() => handleColorChange(color)}
              />

              <span
                className={styles.colorCircle}
                style={{ backgroundColor: colorsMap[color] || '#e0e0e0' }}
                aria-label={color}
              ></span>
            </label>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.configurator}>
        <div className={styles.configHeader}>
          <p className={styles.configTitle}>
            {product.category === 'accessories'
              ? 'Select size'
              : 'Select capacity'}
          </p>
        </div>

        <div className={styles.capacityList}>
          {product.capacityAvailable.map(capacity => (
            <label
              className={styles.capacityLabel}
              key={capacity}
              htmlFor={`capacity-${capacity}`}
            >
              <input
                type="radio"
                name="capacity"
                value={capacity}
                id={`capacity-${capacity}`}
                className={styles.hiddenRadio}
                checked={capacity === activeCapacity}
                onChange={() => handleCapacityChange(capacity)}
              />

              <span className={styles.capacityBox} aria-label={capacity}>
                {capacity
                  .replace('GB', ' GB')
                  .replace('TB', ' TB')
                  .replace('mm', ' mm')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.prices}>
        <span className={styles.price}>${product.priceDiscount}</span>
        <span className={styles.fullPrice}>${product.priceRegular}</span>
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.addToCartBtn}>
          Add to cart
        </button>
        <button
          type="button"
          className={classNames(styles.favoritesBtn, {
            [styles.active]: isFavorite,
          })}
          onClick={() => onClickFav()}
        >
          <span className={styles.favoritesIcon} aria-label="Favorites" />
        </button>
      </div>

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specName}>Resolution</span>
          <span className={styles.specValue}>{product.resolution}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specName}>Processor</span>
          <span className={styles.specValue}>{product.processor}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>
            {product.ram.replace('GB', ' GB')}
          </span>
        </div>
      </div>
    </div>
  );
};
