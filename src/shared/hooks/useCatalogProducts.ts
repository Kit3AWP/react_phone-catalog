import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from './products';
import { Product } from '../types/Product';

export const useCatalogProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const location = useLocation();

  const currentCategory = location.pathname.slice(1);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const allProducts = await getProducts();

        const filteredByCategory = allProducts.filter(
          product => product.category === currentCategory,
        );

        setProducts(filteredByCategory);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`There are no phones/tablets/accessories yet`, error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [currentCategory]);

  return {
    products,
    isLoading,
    hasError,
    currentCategory,
  };
};
