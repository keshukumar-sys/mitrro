import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Mitrro?",
    answer:
      "Mitrro is a multi-category platform where users can explore products, services, and essential items. You can browse categories, read details, save items to wishlist, and enjoy a seamless shopping/booking experience.",
  },
  {
    question: "Is Mitrro free to use?",
    answer:
      "Yes, Mitrro is completely free for users. You can browse, search, view details, and wishlist products without any extra charges.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Simply click on the login/signup button and register using your email, phone number, or social login (if enabled). Your profile will be created instantly.",
  },
  {
    question: "How do I add items to my wishlist?",
    answer:
      "Every product or service has a heart (♥) icon. Click it to add the item to your wishlist. You can view all saved items in the Wishlist page.",
  },
  {
    question: "Are my personal details secure?",
    answer:
      "Absolutely. Mitrro uses industry-standard encryption and secure authentication to protect all user data.",
  },
  {
    question: "How can I submit a review?",
    answer:
      "You can visit the Reviews page, fill out the form with your name and review content, and submit it. Your review will appear after successful entry into the database.",
  },
  {
    question: "Can I explore categories?",
    answer:
      "Yes, Mitrro offers a wide range of categories. You can browse through each category by tapping its card, which redirects you to the relevant category page.",
  },
  {
    question: "Who can I contact for support?",
    answer:
      "You can contact us through our support page or email us at contact@mitrro.com. Our team is available to assist you.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-10 text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#161616] rounded-xl shadow-md p-4 cursor-pointer transition"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {item.question}
                </h3>

                {openIndex === index ? (
                  <ChevronUp className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="text-gray-700 dark:text-gray-300" />
                )}
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
