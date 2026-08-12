import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductsDetails';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}api/products.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  return response.json();
};

export const getProductDetailsById = async (
  category: string,
  productId: string,
): Promise<ProductDetails> => {
  const targetCategory = category || 'phones';

  const response = await fetch(`/api/${targetCategory}/${productId}.json`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch details for category "${targetCategory}" and ID "${productId}"`,
    );
  }

  return response.json();
};

export const getDetailedProduct = async (
  productId: string,
): Promise<ProductDetails> => {
  const allProducts = await getProducts();

  const lightProduct = allProducts.find(item => item.itemId === productId);

  if (!lightProduct) {
    throw new Error(`${import.meta.env.BASE_URL}api/products.json`);
  }

  const category = lightProduct.category;

  const response = await fetch(
    `${import.meta.env.BASE_URL}api/${category}.json`,
  );

  if (!response.ok) {
    throw new Error('Failed to load category details');
  }

  const detailedItems: ProductDetails[] = await response.json();

  const detailedItem = detailedItems.find(item => item.id === productId);

  if (!detailedItem) {
    throw new Error('Product details not found');
  }

  return {
    ...detailedItem,
    numericId: lightProduct.id,
  };
};
