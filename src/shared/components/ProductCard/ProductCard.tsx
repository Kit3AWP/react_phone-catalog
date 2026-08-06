import React from 'react';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: number;
  fullPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`${import.meta.env.BASE_URL}${imageUrl}`}
          alt={name}
          className={styles.image}
        />
      </div>

      <h3 className={styles.title}>{name}</h3>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice && <span className={styles.fullPrice}>${fullPrice}</span>}
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
        <button type="button" className={styles.favoritesBtn}>
          <span className={styles.favoritesIcon} aria-label="Favorites" />
        </button>
      </div>
    </article>
  );
};
