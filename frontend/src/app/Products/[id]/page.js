import Image from 'next/image';
import product_cover from '../../../assets/product_cover.jpg';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import { BASE_URL } from '@/utils/config';
import ProductsMain from '@/Components/Products/ProductsMain';

// Function to call get Categories
async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/category`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Fetch categories and parameters from the server
export default async function Products({ params }) {
  const { id } = params;
  
  let categories;
  let error = null;

  try {
    categories = await getCategories();
  } catch (e) {
    error = e;
  }

  return (
    <main>
      <Header />

      {/* Cover Image */}
      <div className="w-full h-[350px]">
        <Image className="h-full w-full object-cover" src={product_cover} />
      </div>

      <ProductsMain categories={categories} id={id} categoryError={error} />

      <Footer />
    </main>
  );
}
