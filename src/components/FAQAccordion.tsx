import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4.5 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-gray-950/80 shadow-lg shadow-gray-200/50'
                : 'border-gray-200/60 hover:border-gray-400 hover:shadow-sm'
            }`}
            id={`faq_item_${index}`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5.5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
              aria-expanded={isOpen}
              id={`faq_btn_${index}`}
            >
              <span className="font-display font-bold text-gray-950 text-base md:text-lg pr-4 group-hover:text-gray-900 transition-colors">
                {item.question}
              </span>
              <span
                className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 transform transition-all duration-300 shrink-0 text-gray-500 group-hover:text-gray-950 group-hover:border-gray-300 ${
                  isOpen ? 'rotate-180 bg-gray-950 text-white border-transparent' : ''
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
              }`}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 py-5.5 text-gray-600 leading-relaxed text-sm md:text-base bg-gray-50/30">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

