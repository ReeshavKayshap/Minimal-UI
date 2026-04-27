"use client";

import FAQAccordion from "@/components/core/Faq";

const demoData = [
  {
    id: 1,
    title: "What is Interaction Design?",
    answer:
      "Designing how users interact with digital interfaces with intuitive experiences. It focuses on how users engage with technology and aims to create meaningful interactions.",
  },
  {
    id: 2,
    title: "Principles & Patterns",
    answer:
      "Fundamental guidelines and repeated solutions that ensure consistency and usability in design. Patterns are reusable solutions to common design problems.",
  },
  {
    id: 3,
    title: "Usability & Accessibility",
    answer:
      "Focusing on making digital designs easy to use and accessible for everyone, including those with disabilities. Both are critical for a successful product.",
  },
  {
    id: 4,
    title: "Prototyping & Testing",
    answer:
      "Prototyping involves creating interactive mockups of your design. Testing these prototypes with real users helps identify friction points before development begins.",
  },
  {
    id: 5,
    title: "UX Optimisation",
    answer:
      "Improving the overall user experience by enhancing usability and satisfaction based on user feedback, analytics, and performance metrics.",
  },
];

export default function FAQAccordionPreview() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <FAQAccordion items={demoData} />
    </div>
  );
}
