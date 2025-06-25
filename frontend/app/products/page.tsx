import VariantsMain from '@/components/products/VariantsMain';
import Image from 'next/image';
import product_cover from '../../assets/product_cover.jpg';
import PageLayout from '@/components/layout/PageLayout';
import { Suspense } from 'react';


// Fetch categories and parameters from the server
const Products = () => {
  return (
    <PageLayout>
      <Suspense fallback={
        <div className="p-5 sm:p-10 flex justify-center items-center min-h-[200px]">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      }>
        <main>
          {/* Cover Image */}
          <div className="w-full h-[350px]">
            <Image className="h-full w-full object-cover" src={product_cover} alt="" />
          </div>

          <VariantsMain />
        </main>
      </Suspense>
    </PageLayout>
  );
}


export default Products;
