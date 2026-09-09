import { Mail, MessageCircle, HelpCircle, Package, Truck, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I request a custom bespoke dock?",
      answer: "We offer custom 3D-scanned docks for luxury and performance cars. Simply send a photo of your vehicle's center console to support@qicdock.com with the subject 'Custom Dock Request'. Our engineering team will review it and get back to you with the fabrication process and timeline."
    },
    {
      question: "What is your warranty policy?",
      answer: "All QICDOCK products come with a comprehensive 1-Year Warranty. We offer an Instant Hardware Replacement Guarantee — if there are any defects or performance issues, we provide a direct door-to-door (D2D) replacement."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer Free Express Shipping on all India orders above ₹999."
    },
    {
      question: "What is the 100% Fit Guarantee?",
      answer: "We meticulously design our vehicle-specific mounts to perfectly match OEM dashboard and console lines. If your designated mount doesn't fit your specified car model perfectly, we will accept a return or exchange it for a proper fit at no extra cost."
    },
    {
      question: "Can I use the Universal Pad in any car?",
      answer: "Absolutely. The Universal Automotive Charging Pad is designed with a non-slip, adaptable silicone base that conforms to most flat dashboard and center console surfaces, making it compatible with almost any vehicle."
    }
  ];

  return (
    <div className="bg-[#080808] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#04D9FF]/10 border border-[#04D9FF]/30 text-[#04D9FF] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Support Center
          </div>
          <h1 className="text-4xl md:text-6xl font-['Anton'] uppercase tracking-wide text-white mb-6">
            How can we <span className="text-[#04D9FF]">help you?</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From vehicle compatibility questions to warranty claims, our dedicated support team is here to ensure your QICDOCK experience is seamless.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#121212] border border-[#222] hover:border-[#04D9FF]/50 transition-colors rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#04D9FF]/10 rounded-full flex items-center justify-center mb-5">
              <Mail className="w-7 h-7 text-[#04D9FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Email Support</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">
              For general inquiries, compatibility checks, and custom dock requests. We typically reply within 24 hours.
            </p>
            <a href="mailto:support@qicdock.com" className="bg-white text-[#080808] hover:bg-[#04D9FF] transition-colors font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl w-full sm:w-auto inline-block">
              support@qicdock.com
            </a>
          </div>

          <div className="bg-[#121212] border border-[#222] hover:border-[#04D9FF]/50 transition-colors rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#04D9FF]/10 rounded-full flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-[#04D9FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Warranty & Replacements</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">
              Facing hardware issues? Claim your 1-Year replacement warranty for instant D2D replacement.
            </p>
            <a href="mailto:support@qicdock.com?subject=Warranty%20Claim" className="bg-[#1a1a1a] border border-[#333] hover:border-[#04D9FF] text-white transition-colors font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl w-full sm:w-auto inline-block">
              File a Claim
            </a>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl p-6 sm:p-10">
          <h2 className="text-2xl md:text-3xl font-['Anton'] uppercase tracking-wide text-white mb-8 text-center">
            Frequently Asked <span className="text-[#04D9FF]">Questions</span>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-xl transition-colors ${openFaq === index ? 'bg-[#121212] border-[#04D9FF]/30' : 'bg-[#0a0a0a] border-[#222] hover:border-[#333]'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className={`font-bold text-sm md:text-base ${openFaq === index ? 'text-[#04D9FF]' : 'text-gray-200'}`}>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#04D9FF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-400 leading-relaxed border-t border-[#1a1a1a] mt-2 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
