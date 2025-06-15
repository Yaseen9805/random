import { ProfessionalCard } from "@/components/professional-card";
import { Baby, Heart, Leaf, Stethoscope } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Help | SwaSakhi",
  description: "Find OB/GYNs, pediatricians, therapists, and nutritionists.",
};

const professionals = [
  {
    name: "Dr. Venkatesh Reddy", // Changed from Ms B Haritha Shyam
    specialty: "Nutritionist",
    description: "Msc Nutrition, Registered Dietician. 20+ Years Experience.",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d", 
    aiHint: "female doctor", // Keeping aiHint as is, can be updated if needed
    Icon: Leaf,
    phoneNumber: "7709639841",
  },
  {
    name: "Dr. Sunil Patil",
    specialty: "Pediatrician",
    description: "Sr. Consultant MBBS, DNB Paediatrics, IAP Fellowship In Neonatology. 10+ Years Experience.",
    imageUrl: "https://cdn.hexahealth.com/Image/webp/480x480/1715407365894-257399444.webp", 
    aiHint: "male doctor friendly",
    Icon: Baby, 
    phoneNumber: "9135067007",
  },
  {
    name: "Dr. Namita Singh",
    specialty: "Psychologist / Therapist",
    description: "Ph.D. in Psychology, M.Phil.-Specialization Neuropsychology. 24+ Years Experience.",
    imageUrl: "https://images.apollo247.in/doctors/b3785eb1-59e7-4741-b639-909a43196e50-1710258903060.png?tr=w-150,c-at_max,f-auto,q=80,dpr-2", 
    aiHint: "female therapist",
    Icon: Heart,
    phoneNumber: "7191817032",
  },
  {
    name: "Dr. Gouthami Thota",
    specialty: "OB/GYN",
    description: "Best Gynecologist in Kompally, Hyderabad - Ankura Hospital.",
    imageUrl: "https://www.ankurahospitals.com/wp-content/uploads/2024/02/Dr.-Gouthami.jpg",
    aiHint: "female gynecologist",
    Icon: Stethoscope,
    phoneNumber: "090531 08108",
  },
];

export default function ProfessionalHelpPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Find Professional Help</h1>
        <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">
          Connect with experienced healthcare professionals to support your journey through pregnancy and motherhood.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {professionals.map((prof, index) => (
          <ProfessionalCard
            key={index}
            name={prof.name}
            specialty={prof.specialty}
            description={prof.description}
            imageUrl={prof.imageUrl}
            aiHint={prof.aiHint}
            Icon={prof.Icon}
            phoneNumber={prof.phoneNumber}
          />
        ))}
      </div>
    </div>
  );
}
