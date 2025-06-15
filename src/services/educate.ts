
/**
 * @fileOverview Service for managing educational content (formerly blog posts).
 * Provides types and sample data for educational articles.
 */

export const educateCategories = [
  "Week-wise Pregnancy Guidance",
  "Nutrition",
  "Vaccination",
  "Child Care Tips",
] as const;
export type EducateCategory = typeof educateCategories[number];

/**
 * Represents an educational content post.
 */
export interface EducatePost {
  id: string;
  title: string;
  content: string;
  author: string;
  publicationDate: string; // Should be an ISO string
  category: EducateCategory;
  tags?: string[];
  imageUrl?: string;
  aiHint?: string; // For placeholder images if imageUrl is a placeholder
}

// Sample data for demonstration
export const initialSampleEducatePosts: EducatePost[] = [
  {
    id: "1",
    title: "Navigating Morning Sickness: Tips & Tricks for a Smoother First Trimester",
    author: "Dr. Emily Carter, OB/GYN",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    category: "Week-wise Pregnancy Guidance",
    content: "Morning sickness can be a challenging part of early pregnancy. It's characterized by nausea and sometimes vomiting. While it's often called 'morning' sickness, it can actually occur at any time of day or night. For many women, it begins around the 6th week of pregnancy and may subside by the 12th to 14th week, though some experience it for longer.\n\nStrategies to cope include eating small, frequent meals throughout the day to keep your stomach from becoming empty. Bland foods like crackers, toast, or rice can be easier to tolerate. Staying hydrated is crucial, so sip water, ginger ale, or clear broths. Ginger, in various forms like tea, candies, or capsules, has been found to help some women. Acupressure wristbands are another non-medicinal option that may provide relief. Rest is also important, as fatigue can exacerbate nausea. If your symptoms are severe, consult your healthcare provider, as there are safe medications that can be prescribed.",
    tags: ["pregnancy", "first trimester", "morning sickness", "health"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "pregnant woman tea",
  },
  {
    id: "2",
    title: "Understanding Postpartum Emotions: You're Not Alone on This Journey",
    author: "Sarah Chen, LCSW",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    category: "Child Care Tips",
    content: "The postpartum period is a time of immense change, both physically and emotionally. It's common to experience a wide range of feelings, from joy and excitement to sadness, anxiety, and irritability. These fluctuating emotions are often referred to as the 'baby blues' and typically resolve within a couple of weeks after childbirth.\n\nHowever, for some women, these feelings can be more intense and persistent, potentially indicating Postpartum Depression (PPD) or Postpartum Anxiety (PPA). Symptoms of PPD can include deep sadness, loss of interest in activities, changes in appetite or sleep, fatigue, feelings of worthlessness, and difficulty bonding with the baby. PPA might manifest as excessive worry, racing thoughts, panic attacks, and a constant feeling of being on edge. It's crucial to remember that these are medical conditions, not signs of weakness or failure as a mother. Reaching out for support from healthcare professionals, therapists, support groups, or trusted loved ones is a sign of strength. Treatment options, including therapy and medication, are available and effective.",
    tags: ["postpartum", "mental health", "PPD", "emotions"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "mother child hug",
  },
  {
    id: "3",
    title: "Essential Nutrients Your Body Needs During Pregnancy for a Healthy Baby",
    author: "Dr. David Miller, Nutritionist",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    category: "Nutrition",
    content: "Proper nutrition during pregnancy is vital for both the mother's health and the baby's development. Key nutrients include Folic Acid (to prevent neural tube defects), Iron (for blood production and oxygen transport), Calcium (for bone development), Vitamin D (aids calcium absorption), Protein (for growth of baby's tissues and organs), and Omega-3 fatty acids (especially DHA, for brain and eye development).\n\nA balanced diet rich in fruits, vegetables, whole grains, lean proteins, and dairy (or fortified alternatives) is essential. Consult your healthcare provider or a registered dietitian for personalized advice and to discuss prenatal supplements.",
    tags: ["pregnancy", "nutrition", "vitamins", "diet"],
    // No imageUrl to test fallback
    aiHint: "healthy food fruits",
  },
  {
    id: "4",
    title: "Childhood Vaccination Schedule: A Parent's Guide to Immunizations",
    author: "Dr. Lisa Ray, Pediatrician",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    category: "Vaccination",
    content: "Vaccinations are a safe and effective way to protect your child from serious diseases. The recommended childhood immunization schedule is designed to provide immunity early in life, before children are exposed to potentially life-threatening illnesses. Key vaccines protect against diseases like measles, mumps, rubella, polio, diphtheria, tetanus, pertussis (whooping cough), hepatitis B, Haemophilus influenzae type b (Hib), and pneumococcal disease.\n\nYour pediatrician will guide you through the schedule, typically starting at birth and continuing through early childhood. It's important to stay up-to-date with these vaccinations to ensure your child and the community are protected. Discuss any concerns or questions you have with your healthcare provider.",
    tags: ["child health", "vaccines", "pediatrics", "immunization"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "doctor baby vaccine",
  },
  {
    id: "5",
    title: "Top 5 Superfoods for a Healthy Pregnancy Diet",
    author: "Dr. Laura Miles, Nutritionist",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    category: "Nutrition",
    content: "During pregnancy, your nutritional needs increase to support your growing baby. Incorporating superfoods can provide a powerhouse of essential vitamins and minerals. \n1. **Lentils**: Rich in protein and folate, crucial for preventing neural tube defects. \n2. **Salmon**: A great source of omega-3 fatty acids (DHA) for baby's brain development. \n3. **Spinach**: Packed with iron, folate, and vitamin A. \n4. **Greek Yogurt**: High in calcium, protein, and probiotics. \n5. **Berries**: Loaded with antioxidants, vitamin C, and fiber. \nAlways cook salmon thoroughly and consult your doctor about fish consumption.",
    tags: ["nutrition", "superfoods", "healthy eating", "pregnancy diet"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "healthy food berries",
  },
  {
    id: "6",
    title: "Creating a Safe Sleep Environment for Your Newborn Baby",
    author: "Mark Johnson, Pediatric Sleep Consultant",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    category: "Child Care Tips",
    content: "Ensuring a safe sleep environment is one of the most important things you can do for your newborn. The American Academy of Pediatrics recommends placing babies on their back for all sleep times – naps and at night – to reduce the risk of SIDS. Use a firm, flat sleep surface, such as a mattress in a safety-approved crib, covered by a fitted sheet. Keep soft objects, loose bedding, bumpers, and toys out of the baby's sleep area. Your baby should sleep in the same room as you, but not in the same bed, for at least the first 6 months.",
    tags: ["newborn care", "safe sleep", "SIDS prevention", "parenting"],
    // No imageUrl to test fallback
    aiHint: "baby sleeping crib",
  },
  {
    id: "7",
    title: "Week 20: Halfway There! What to Expect During Your Anatomy Scan",
    author: "Dr. Anya Sharma, OB/GYN",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    category: "Week-wise Pregnancy Guidance",
    content: "Congratulations, you've reached the halfway point of your pregnancy! Around week 20, you might have your mid-pregnancy ultrasound, often called the anatomy scan, to check your baby's development and possibly find out the gender. Your baby is now about the size of a banana and is becoming more active – you might be feeling those little kicks and flutters more regularly. You might also notice changes like a more prominent baby bump, increased appetite, and perhaps some backaches. Continue with your healthy diet, gentle exercise, and regular prenatal check-ups.",
    tags: ["pregnancy", "week 20", "ultrasound", "baby development"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "pregnant ultrasound scan",
  },
  {
    id: "8",
    title: "Why the Flu Shot is Important During Pregnancy and Postpartum",
    author: "Dr. Ken Alistair, Immunologist",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    category: "Vaccination",
    content: "Getting a flu shot during pregnancy is highly recommended and safe for both mother and baby. Pregnant women are more susceptible to severe illness from the flu due to changes in their immune system, heart, and lungs. The flu vaccine can help prevent serious complications, such as pneumonia, and can reduce the risk of flu-related hospitalization. Importantly, the flu shot also passes some protection to the baby, which lasts for several months after birth, a critical period when the baby is too young to be vaccinated themselves. The flu shot can be given during any trimester of pregnancy.",
    tags: ["vaccination", "flu shot", "pregnancy health", "immunization"],
    // No imageUrl to test fallback
    aiHint: "pregnant woman doctor",
  },
   {
    id: "9",
    title: "Introducing Solids: A Beginner's Guide for Your Baby",
    author: "Maria Lane, Pediatric Nutritionist",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    category: "Child Care Tips",
    content: "Around 6 months, most babies are ready to start exploring solid foods. Look for signs of readiness, such as good head control, sitting up with support, and showing interest in food. Start with single-ingredient purees like avocado, banana, sweet potato, or iron-fortified infant cereal. Introduce new foods one at a time, waiting a few days in between to watch for any allergic reactions. Make mealtime a fun and relaxed experience. Don't worry too much about how much they eat initially; breast milk or formula is still their primary source of nutrition for the first year.",
    tags: ["baby food", "weaning", "nutrition", "parenting"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "baby eating puree",
  },
  {
    id: "10",
    title: "Week 36: Nesting and Preparing for Labor",
    author: "Dr. Emily Carter, OB/GYN",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    category: "Week-wise Pregnancy Guidance",
    content: "As you approach your due date, you might experience the 'nesting instinct' – a burst of energy and desire to prepare your home for the baby. This is a great time to pack your hospital bag, set up the nursery, and finalize any last-minute preparations. Your baby is now considered full-term and continues to gain weight. You might feel increased pressure in your pelvis as the baby drops. Familiarize yourself with the signs of labor, such as regular contractions, your water breaking, or a bloody show. Rest as much as possible and keep your healthcare provider informed of any changes.",
    // No imageUrl to test fallback
    aiHint: "pregnant woman nursery",
  },
  {
    id: "11",
    title: "Understanding Baby's Growth Spurts and Sleep Regressions",
    author: "Dr. Ken Alistair, Pediatrician",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    category: "Child Care Tips",
    content: "Growth spurts and sleep regressions are common phases in a baby's first year. During a growth spurt, your baby might seem hungrier than usual and want to feed more often. They might also be fussier or sleep more. These typically last a few days. Sleep regressions often occur around 4 months, 8-10 months, and 12 months, coinciding with developmental milestones. Your baby might suddenly start waking more frequently at night or have trouble settling. Maintain a consistent bedtime routine, offer comfort, and remember these phases are temporary. Patience and consistency are key.",
    tags: ["baby development", "growth spurt", "sleep regression", "parenting"],
    // imageUrl: "https://placehold.co/600x300.png", // Removed to show fallback
    aiHint: "baby sleeping peacefully",
  },
  {
    id: "12",
    title: "The Importance of Iron in Your Child's Diet",
    author: "Sarah Chen, Registered Dietitian",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
    category: "Nutrition",
    content: "Iron is a crucial nutrient for your child's growth and development, particularly for brain development and preventing anemia. Good sources of iron for babies and toddlers include iron-fortified cereals, pureed meats (like beef or chicken), lentils, beans, and spinach. Vitamin C helps with iron absorption, so pair iron-rich foods with fruits and vegetables like oranges, strawberries, or bell peppers. If you're concerned about your child's iron intake, speak to your pediatrician or a dietitian.",
    // No imageUrl to test fallback
    aiHint: "child eating vegetables",
  }
];

/**
 * Asynchronously retrieves a list of educational posts.
 * This is a placeholder. In a real application, this would fetch from a database or API.
 * @returns A promise that resolves to an array of EducatePost objects.
 */
export async function getEducatePosts(): Promise<EducatePost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialSampleEducatePosts);
    }, 500); // Simulate network delay
  });
}

