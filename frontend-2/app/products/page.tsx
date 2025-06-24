import VariantsMain from '@/components/products/VariantsMain';
import Image from 'next/image';
import product_cover from '../../assets/product_cover.jpg';
import PageLayout from '@/components/layout/PageLayout';


// Fetch categories and parameters from the server
const Products = () => {
  return (
    <PageLayout>
      <main>
        {/* Cover Image */}
        <div className="w-full h-[350px]">
          <Image className="h-full w-full object-cover" src={product_cover} alt="" />
        </div>

        <VariantsMain />
      </main>
    </PageLayout>
  );
}


export default Products;
