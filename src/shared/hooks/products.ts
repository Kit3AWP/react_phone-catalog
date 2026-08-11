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

export const getProductById = async (productId: string): Promise<Product> => {
  const allProducts = await getProducts();

  const product = allProducts.find(item => item.itemId === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getDetailedProduct = async (
  productId: string,
): Promise<ProductDetails> => {
  const allProducts = await getProducts();

  const lightProduct = allProducts.find(item => item.itemId === productId);

  if (!lightProduct) {
    throw new Error('There are no product in catalog');
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

  return detailedItem;
};
