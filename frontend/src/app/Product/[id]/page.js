import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import ProductMain from "@/Components/Product/ProductMain";
import { BASE_URL } from '@/utils/config';

// Function to call get Product Data
async function getProductData(id) {
  try {
    const response = await fetch(`${BASE_URL}/variant/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Function to call get Related Data
async function getRelatedData(id) {
  try {
    const response = await fetch(`${BASE_URL}/variant/?category=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default async function Product({ params }) {
  const { id } = params;

  let product;
  let productError = null;

  try {
    product = await getProductData(id);
  } catch (e) {
    productError = e;
  }

  let relatedProducts;
  let relatedError = null;

  try {
    relatedProducts = await getRelatedData(product?.product_id?.category_id);
  } catch (e) {
    relatedError = e;
  }


  return (
    <div>
      <Header />
      <p className="text-sm p-5 text-[#2d394b]">Home / Products / Product</p>
      <ProductMain 
        product={product} 
        productError={productError} 
        relatedProducts={relatedProducts}
        relatedError={relatedError}
        id={id}
      />
      <Footer />
    </div>
  );
}
