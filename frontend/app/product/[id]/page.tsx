import PageLayout from "@/components/layout/PageLayout";
import VariantMain from "@/components/product/VariantMain";
import ColorConstants from "@/constants/ColorConstants";



const Product = async ({ params }: {params: Promise<{ id: string }>}) => {
  const { id } = await params;

  return (
    <PageLayout>
      <div>
        <p className="text-sm p-5 text-[#2d394b]" style={{color: ColorConstants.secondaryColor}}>Home / Products / Product</p>
          <VariantMain 
              id={id}
          />
      </div>
    </PageLayout>
  );
}


export default Product;
