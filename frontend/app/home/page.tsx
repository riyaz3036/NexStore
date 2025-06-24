import CategoryPreview from "@/components/home/CategoryPreview";
import FeatureCards from "@/components/home/FeatureCards";
import Services from "@/components/home/Services";
import PreviewDataService from "@/services/preview-data.service";
import { PreviewVariant } from "@/types/preview.types";
import "../globals.css";
import PageLayout from "@/components/layout/PageLayout";
import { MsgEnum } from "@/enums/message-enum";
import { message } from "@/components/common/message/message";



const Home = async () => {
  let previewData: PreviewVariant[] = [];
  let error = "";

  try {
    const response = await PreviewDataService.fetchPreviewData();
    previewData = response?.data || [];
  } catch (err: any) {
    console.error("Error fetching preview data:", err);
    error = err?.message || "Failed to load preview data";
    message.open({ text: error, type: MsgEnum.ERROR });
  }

  return (
    <PageLayout>
      <main className="bg-white">
          <FeatureCards />
    
          {/* {error && <p className="p-5 text-xl text-center text-gray-500">{error}</p>} */}
          { previewData.length > 0 && previewData.map(preview => (
            <CategoryPreview
              key={preview.category.id}
              left={previewData.indexOf(preview) % 2 === 0}
              preview={preview}
            />
          ))}
    
          <Services />
      </main>
    </PageLayout>
  );
}


export default Home;