import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useFavorites } from '../../hooks/useFavorites';
import classNames from 'classnames';

interface ProductCardProps {
  product: Product;
  hideFullPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hideFullPrice,
}) => {
  const { image, name, price, fullPrice, screen, capacity, ram } = product;
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={name}
          className={styles.image}
        />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {!hideFullPrice && fullPrice && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>
      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span className={styles.specName}>Screen:</span>
          <span className={styles.specValue}>{screen}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specName}>Capacity:</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>

        <div className={styles.specItem}>
          <span className={styles.specName}>RAM:</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
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
          onClick={() => toggleFavorite(product)}
        >
          <span className={styles.favoritesIcon} aria-label="Favorites" />
        </button>
      </div>
    </article>
  );
};
