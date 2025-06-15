
/**
 * Represents a blog post.
 */
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publicationDate: string; // Should be an ISO string
  tags?: string[];
  imageUrl?: string;
  aiHint?: string; // For placeholder images if imageUrl is a placeholder
}

// Sample data for demonstration, used as a fallback
export const initialSampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Navigating Morning Sickness: Tips & Tricks",
    author: "Dr. Emily Carter",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    content: "Morning sickness can be a challenging part of early pregnancy. It's characterized by nausea and sometimes vomiting. While it's often called 'morning' sickness, it can actually occur at any time of day or night. For many women, it begins around the 6th week of pregnancy and may subside by the 12th to 14th week, though some experience it for longer.\n\nStrategies to cope include eating small, frequent meals throughout the day to keep your stomach from becoming empty. Bland foods like crackers, toast, or rice can be easier to tolerate. Staying hydrated is crucial, so sip water, ginger ale, or clear broths. Ginger, in various forms like tea, candies, or capsules, has been found to help some women. Acupressure wristbands are another non-medicinal option that may provide relief. Rest is also important, as fatigue can exacerbate nausea. If your symptoms are severe, consult your healthcare provider, as there are safe medications that can be prescribed.",
    tags: ["pregnancy", "first trimester", "morning sickness", "health"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "pregnant woman tea",
  },
  {
    id: "2",
    title: "Understanding Postpartum Emotions: You're Not Alone",
    author: "Sarah Chen, LCSW",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    content: "The postpartum period is a time of immense change, both physically and emotionally. It's common to experience a wide range of feelings, from joy and excitement to sadness, anxiety, and irritability. These fluctuating emotions are often referred to as the 'baby blues' and typically resolve within a couple of weeks after childbirth.\n\nHowever, for some women, these feelings can be more intense and persistent, potentially indicating Postpartum Depression (PPD) or Postpartum Anxiety (PPA). Symptoms of PPD can include deep sadness, loss of interest in activities, changes in appetite or sleep, fatigue, feelings of worthlessness, and difficulty bonding with the baby. PPA might manifest as excessive worry, racing thoughts, panic attacks, and a constant feeling of being on edge. It's crucial to remember that these are medical conditions, not signs of weakness or failure as a mother. Reaching out for support from healthcare professionals, therapists, support groups, or trusted loved ones is a sign of strength. Treatment options, including therapy and medication, are available and effective.",
    tags: ["postpartum", "mental health", "PPD", "emotions"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "mother child hug",
  },
  {
    id: "3",
    title: "Creating a Nurturing Nursery on a Budget",
    author: "Alex Green, DIY Expert",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    content: "Welcoming a new baby doesn't mean you have to break the bank when setting up their nursery. With a bit of creativity and planning, you can design a cozy, functional, and nurturing space. Start by focusing on essentials: a safe crib, a comfortable changing station, and adequate storage. Consider multi-functional furniture, like a dresser that can also serve as a changing table.\n\nEmbrace DIY projects for decor – create your own artwork, mobiles, or wall hangings. Repurpose or upcycle existing furniture with a fresh coat of non-toxic paint. Shop secondhand for items like gliders or bookshelves; often, you can find high-quality pieces at a fraction of the cost. Soft lighting, like a dimmer switch or a nightlight, can create a calming ambiance. Remember, the most important aspect is creating a safe and loving environment for your little one.",
    tags: ["nursery", "baby", "DIY", "budgeting"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "baby nursery decor",
  },
  {
    id: "4",
    title: "Gentle Exercises for the Third Trimester",
    author: "Maria Rodriguez, Prenatal Fitness Coach",
    publicationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    content: "Staying active in your third trimester can offer many benefits, including improved mood, better sleep, and preparation for labor. However, it's important to choose gentle, low-impact exercises. Walking is an excellent option – aim for 20-30 minutes most days if you feel up to it. Prenatal yoga can help with flexibility, balance, and relaxation; focus on modified poses that accommodate your growing belly. Pelvic tilts and Kegel exercises are crucial for strengthening your pelvic floor. Swimming is another fantastic choice, as the water supports your weight and reduces strain on your joints.\n\nAlways listen to your body and avoid any movements that cause pain or discomfort. Stay well-hydrated and don't overexert yourself. Before starting or continuing any exercise program during pregnancy, it's essential to consult with your healthcare provider to ensure it's safe for you and your baby.",
    tags: ["pregnancy", "third trimester", "exercise", "fitness"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "pregnant woman exercise",
  }
];


/**
 * Asynchronously retrieves a list of blog posts.
 * This is a placeholder. In a real application, this would fetch from a database or API.
 * @returns A promise that resolves to an array of BlogPost objects.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  // For now, we can return the sample posts or simulate an async fetch.
  // In a real app, this would interact with a backend.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialSampleBlogPosts);
    }, 500); // Simulate network delay
  });
}
