import { message } from "@/components/common/message/message";
import PageLayout from "@/components/layout/PageLayout";
import VariantMain from "@/components/product/VariantMain";
import ColorConstants from "@/constants/ColorConstants";
import { MsgEnum } from "@/enums/message-enum";
import VariantService from "@/services/variant.service";
import { ExpandedProduct } from "@/types/product.types";



const Product = async (context: {params: { id: string }}) => {
  const id = context.params.id;

  let expandedProduct: ExpandedProduct | null = null;
  let error = "";

  try {
    const response = await VariantService.fetchExpandedProduct(id);
    expandedProduct = response?.data || [];
  } catch (err: any) {
    console.error("Error fetching product", err);
    error = err?.message || "Error fetching product";
    message.open({ text: error, type: MsgEnum.ERROR });
  }
    

  return (
    <PageLayout>
      <div>
        <p className="text-sm p-5 text-[#2d394b]" style={{color: ColorConstants.secondaryColor}}>Home / Products / Product</p>
        {expandedProduct !== null && (
          <VariantMain 
              product={expandedProduct} 
              id={id}
          />
        )}
      </div>
    </PageLayout>
  );
}


export default Product;
