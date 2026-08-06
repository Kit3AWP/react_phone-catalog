import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductCard } from '../../../../shared/components/ProductCard';
import styles from './ProductsSlider.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Product } from '../../../../types/Product';

interface ProductsSliderProps {
  title: string;
  products: Product[];
  sliderId: string;
  hideFullPrice?: boolean;
}

export const ProductsSlider = ({
  title,
  products,
  sliderId,
  hideFullPrice,
}: ProductsSliderProps) => {
  return (
    <section className={styles.productsSection}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>

        <div className={styles.buttons}>
          <button className={`${styles.navButton} ${sliderId}-prev`}>
            <span className={styles.leftArrow} aria-label="Left arrow" />
          </button>
          <button className={`${styles.navButton} ${sliderId}-next`}>
            <span className={styles.rightArrow} aria-label="Right arrow" />
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${sliderId}-prev`,
            nextEl: `.${sliderId}-next`,
          }}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            640: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                fullPrice={hideFullPrice ? undefined : product.fullPrice}
                screen={product.screen}
                capacity={product.capacity}
                ram={product.ram}
                imageUrl={product.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
