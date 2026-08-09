import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return response.json();
};
