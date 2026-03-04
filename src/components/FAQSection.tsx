import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Kessler safe to use?",
    answer: "Yes! Kessler queries git ls-files before touching anything and moves files to OS trash, not permanent deletion."
  },
  {
    question: "How is this different from manually deleting node_modules?",
    answer: "Kessler scans your entire system for artifacts across 10+ ecosystems, respects .gitignore rules, and provides a TUI to review before cleanup."
  },
  {
    question: "Will it delete my source code?",
    answer: "Never. Kessler only targets regeneratable artifacts like node_modules, target/, __pycache__, etc."
  },
  {
    question: "What ecosystems are supported?",
    answer: "10+ ecosystems: Node.js, Python, Rust, Go, Java/JVM, .NET, PHP, Ruby, Elixir, and Terraform."
  },
  {
    question: "Can I undo a cleanup?",
    answer: "Yes! Files go to your system's Trash/Recycle Bin. You can restore anything if needed."
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [openItems, setOpenItems] = useState<string>("");

  useEffect(() => {
    if (!isInView && openItems) {
      setOpenItems("");
    }
  }, [isInView, openItems]);

  return (
    <section ref={ref} className="relative z-10 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            <HelpCircle className="w-3 h-3" /> Quick Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-tight font-display">
            Common <span className="text-gradient-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-3"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass border border-white/10 rounded-lg px-4 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:text-primary transition-colors py-4 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-200" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
