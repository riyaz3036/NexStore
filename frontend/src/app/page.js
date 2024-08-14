import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import CategoryPreview from '../Components/Home/CategoryPreview'
import FeatureCards from "../Components/Home/FeatureCards";
import Services from "../Components/Home/Services"
import { BASE_URL } from "@/utils/config";


//function to call get Sample api 
async function getSampleData(){
  try{
    const response = await fetch(`${BASE_URL}/variant/sample`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;

  }catch(error){
   throw error;
  }
}


export default async function Home() {
  let sampleData;
  let error = null;

  try{
    sampleData = await getSampleData();
  }catch(e){
    error=e;
  }

  return (
    <main>
        <Header />

        <FeatureCards />

        {error && <p className="p-5 text-xl text-center text-gray-500">{error}</p>}
        {!error && sampleData.map(category => (
          <CategoryPreview
            key={category.category_id}
            left={sampleData.indexOf(category) % 2 === 0}
            category={category}
          />
        ))}

        <Services />

        <Footer />
    </main>
  );
}
