"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can I manage multiple gyms?",
    a: "Enterprise plans support multiple gym branches from one dashboard.",
  },
  {
    q: "Does GymSphere support online payments?",
    a: "Yes. Payment management is built in and online payment gateways can be integrated.",
  },
  {
    q: "Can trainers access the dashboard?",
    a: "Trainer accounts and role-based permissions are supported.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Authentication, database security and encrypted communication keep your data safe.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-muted-foreground">
            Everything you need to know about GymSphere.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-12"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger>
                {faq.q}
              </AccordionTrigger>

              <AccordionContent>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}