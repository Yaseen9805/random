
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "How early can I feel pregnancy symptoms?",
    answer:
      "Some individuals report feeling early pregnancy symptoms like fatigue, breast tenderness, or mild cramping as early as one to two weeks after conception, often before a missed period. However, many don't notice symptoms until they miss a period or even later. Common early signs include a missed period, nausea (morning sickness), fatigue, frequent urination, and breast changes.",
  },
  {
    question: "Is morning sickness normal, and how long does it last?",
    answer:
      "Yes, morning sickness (nausea and sometimes vomiting) is very common in early pregnancy, affecting up to 70-80% of pregnant people. Despite its name, it can occur at any time of day. It typically starts around the 6th week of pregnancy and often subsides by the 12th to 16th week. For some, it can last longer. Eating small, frequent meals and staying hydrated can help manage symptoms.",
  },
  {
    question: "When should I schedule my first prenatal visit?",
    answer:
      "You should schedule your first prenatal visit as soon as you suspect you're pregnant or have a positive home pregnancy test. This first visit is usually scheduled for around 8 weeks of pregnancy. Early prenatal care is important for a healthy pregnancy.",
  },
  {
    question: "What foods should I avoid during pregnancy?",
    answer:
      "During pregnancy, it's important to avoid certain foods to protect both your health and your baby's. These include: \n- Raw or undercooked meat, poultry, and eggs (risk of Salmonella, E. coli)\n- Raw or undercooked seafood and shellfish (risk of Listeria, parasites)\n- High-mercury fish (e.g., shark, swordfish, king mackerel, tilefish)\n- Unpasteurized dairy products and juices (risk of Listeria)\n- Deli meats and hot dogs unless heated until steaming hot (risk of Listeria)\n- Raw sprouts (e.g., alfalfa, clover, radish, mung bean)\n- Unwashed fruits and vegetables\n- Excessive caffeine (limit to about 200mg per day, roughly one 12oz cup of coffee)\n- Alcohol",
  },
  {
    question: "Can I exercise while pregnant?",
    answer:
      "For most healthy pregnancies, exercise is not only safe but also beneficial. It can help manage weight gain, improve mood, boost energy, and prepare your body for labor. Aim for at least 150 minutes of moderate-intensity aerobic activity per week. Good options include walking, swimming, stationary cycling, and modified yoga or Pilates. Always consult your healthcare provider before starting or continuing an exercise program during pregnancy, especially if you have any complications.",
  },
  {
    question: "How much weight should I gain during pregnancy?",
    answer:
      "Weight gain recommendations during pregnancy depend on your pre-pregnancy Body Mass Index (BMI). General guidelines are: \n- Underweight (BMI < 18.5): 28-40 pounds\n- Normal weight (BMI 18.5-24.9): 25-35 pounds\n- Overweight (BMI 25-29.9): 15-25 pounds\n- Obese (BMI ≥ 30): 11-20 pounds\nIt's best to discuss your individual weight gain goals with your healthcare provider.",
  },
];

export function FaqSection() {
  return (
    <Card className="w-full shadow-xl mt-12 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <HelpCircle className="h-7 w-7 text-primary" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-left hover:text-primary font-medium text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 whitespace-pre-line text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
