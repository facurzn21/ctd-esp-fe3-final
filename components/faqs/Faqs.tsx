import React from "react";
import { FaqsType } from "./faqsData";
import { Box } from "@mui/material";
import FaqItem from "./faqItem";

interface FaqsProps {
  faqs: FaqsType[];
}

const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
  return (
    <Box sx={{ margin: "20px", maxWidth: "1200px" }}>
      {faqs?.map((faq: FaqsType) => (
        <FaqItem key={faq.id} {...faq} />
      ))}
    </Box>
  );
};

export default Faqs;
