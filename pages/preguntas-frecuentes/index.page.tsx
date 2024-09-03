import Faqs from "dh-marvel/components/faqs/Faqs";
import { FaqsType, faqsData } from "dh-marvel/components/faqs/faqsData";

const Index = ({ faqsData }: { faqsData: FaqsType[] }) => {
  return (
    <>
      <Faqs faqs={faqsData} />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      faqsData,
    },
  };
}

export default Index;
