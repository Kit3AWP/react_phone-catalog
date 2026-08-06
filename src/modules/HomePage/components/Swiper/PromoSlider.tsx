/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './PromoSlider.module.scss';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import classNames from 'classnames';

export const PromoSlider = () => {
  return (
    <div className={styles.bannerSection}>
      <div className={styles.sliderWrapper}>
        <button className={classNames(styles.arrowBtn, 'custom-prev')}>
          <span className={styles.leftArrow} aria-label="Arrow left" />
        </button>
        <Swiper
          className={styles.swiperContainer}
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
        >
          <SwiperSlide>
            <img
              className={styles.bannerImg}
              src="/img/banner-tablet-1.png"
              alt="iPhone 14"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className={styles.bannerImg}
              src="/img/banner-tablet-2.png"
              alt="Tablets"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              className={styles.bannerImg}
              src="/img/banner-tablet-3.png"
              alt="Accessories"
            />
          </SwiperSlide>
        </Swiper>
        <button className={classNames(styles.arrowBtn, 'custom-next')}>
          <span className={styles.rightArrow} aria-label="Arrow right" />
        </button>
      </div>
      <div className={classNames(styles.pagination, 'custom-pagination')}></div>
    </div>
  );
};
