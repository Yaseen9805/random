import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Brain, HeartHandshake, Lightbulb, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mental Well-being Hub | SwaSakhi",
  description: "Expert advice, daily tips, and resources for managing postpartum mental health, including depression, anxiety, and stress.",
};

export default function MentalWellbeingPage() {
  return (
    <div className="container mx-auto py-8 space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-3">Mental Well-being Hub</h1>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          Navigating the emotional journey of new motherhood. Find comfort, guidance, and reassurance for your psychological well-being.
        </p>
      </header>

      <Alert variant="destructive" className="max-w-3xl mx-auto">
        <ShieldCheck className="h-5 w-5" />
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          The information provided here is for general guidance and informational purposes only, and does not constitute medical advice. If you are struggling with your mental health, please consult with a healthcare professional or a mental health specialist. You are not alone.
        </AlertDescription>
      </Alert>

      <section id="expert-advice">
        <h2 className="text-3xl font-semibold mb-6 text-center">Expert Insights on Postpartum Mental Health</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain className="text-primary h-6 w-6" />Understanding Postpartum Depression (PPD)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Postpartum Depression is more than just the "baby blues." It involves intense feelings of sadness, anxiety, and exhaustion that can interfere with daily care activities for yourself and your baby. Symptoms can appear days or even months after delivery.
              </p>
              <p className="mt-2 text-sm text-primary font-semibold">Key takeaway: It's a medical condition, not a sign of weakness. Treatment is available and effective.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="text-primary h-6 w-6" />Managing Postpartum Anxiety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                It's common to worry as a new parent, but postpartum anxiety involves excessive worry, fear, and panic attacks that can be overwhelming. You might constantly feel on edge or have racing thoughts.
              </p>
               <p className="mt-2 text-sm text-primary font-semibold">Key takeaway: Recognize the signs and seek support. Coping strategies and therapy can help significantly.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary h-6 w-6" />Coping with Postpartum Stress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                The demands of a new baby, hormonal changes, and sleep deprivation can lead to significant stress. Learning to identify stressors and implement coping mechanisms is crucial for your well-being.
              </p>
              <p className="mt-2 text-sm text-primary font-semibold">Key takeaway: Prioritize small acts of self-care and don't hesitate to ask for help from your support network.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="daily-tips" className="bg-card/50 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Daily Practices for Your Well-being</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium hover:text-primary">Simple Breathing Exercises</AccordionTrigger>
            <AccordionContent className="space-y-3 text-foreground/90">
              <p><strong>4-7-8 Breathing:</strong> Inhale through your nose for 4 seconds, hold your breath for 7 seconds, and exhale slowly through your mouth for 8 seconds. Repeat 3-4 times.</p>
              <p><strong>Box Breathing:</strong> Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat several times.</p>
              <p><strong>Diaphragmatic Breathing (Belly Breathing):</strong> Place one hand on your chest and the other on your belly. Inhale deeply through your nose, letting your belly expand. Exhale slowly through your mouth. Your chest should remain relatively still.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium hover:text-primary">Positive Affirmations</AccordionTrigger>
            <AccordionContent className="space-y-2 text-foreground/90">
              <ul className="list-disc list-inside space-y-1">
                <li>I am a good mother.</li>
                <li>I am strong and capable.</li>
                <li>I am doing my best, and my best is enough.</li>
                <li>I trust my instincts.</li>
                <li>I embrace this new chapter with love and patience.</li>
                <li>It's okay to ask for help.</li>
                <li>I am learning and growing every day.</li>
                <li>I deserve rest and self-care.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium hover:text-primary">Quick Self-Care Practices</AccordionTrigger>
            <AccordionContent className="space-y-2 text-foreground/90">
             <ul className="list-disc list-inside space-y-1">
                <li>Take a 5-10 minute shower or bath.</li>
                <li>Sip a warm, calming tea.</li>
                <li>Listen to a favorite song or podcast.</li>
                <li>Stretch your body gently for a few minutes.</li>
                <li>Step outside for fresh air, even if just for 5 minutes.</li>
                <li>Write down three things you're grateful for.</li>
                <li>Connect with a friend or loved one for a brief chat.</li>
                <li>Read a page or two of a book.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section id="psychological-facts" className="bg-card/30 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Understanding Your Emotional Journey: Psychological Facts</h2>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6 space-y-3 text-foreground/80">
            <p><Lightbulb className="inline-block mr-2 text-primary h-5 w-5" /><strong>Hormonal Shifts:</strong> After childbirth, estrogen and progesterone levels drop dramatically, which can contribute to mood swings and "baby blues." These usually resolve within a few weeks, but if they persist or worsen, it could be PPD.</p>
            <p><Lightbulb className="inline-block mr-2 text-primary h-5 w-5" /><strong>Identity Transformation:</strong> Becoming a mother is a profound identity shift. It's normal to grieve parts of your old life while embracing your new role. Allow yourself time to adjust.</p>
            <p><Lightbulb className="inline-block mr-2 text-primary h-5 w-5" /><strong>Brain Changes:</strong> Research shows that a mother's brain undergoes significant changes during pregnancy and postpartum, enhancing areas related to empathy, anxiety, and social interaction to help bond with and protect the baby.</p>
            <p><Lightbulb className="inline-block mr-2 text-primary h-5 w-5" /><strong>Increased Vulnerability:</strong> The postpartum period can make you more vulnerable to mental health challenges, especially if you have a history of depression or anxiety, or lack social support.</p>
            <p><Lightbulb className="inline-block mr-2 text-primary h-5 w-5" /><strong>"Mom Guilt" is Common:</strong> Many new mothers experience guilt about their choices or feelings. Remember that perfect parenting doesn't exist, and self-compassion is key.</p>
          </CardContent>
        </Card>
      </section>

      <section id="managing-challenges">
        <h2 className="text-3xl font-semibold mb-6 text-center">Navigating Common Postpartum Challenges</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          <AccordionItem value="challenge-1">
            <AccordionTrigger className="text-xl font-medium hover:text-primary">
              <span className="flex items-center gap-2">
                <BedDouble className="text-primary h-6 w-6"/>Managing Sleep Deprivation
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-foreground/90">
              <p><strong>Sleep when the baby sleeps:</strong> This classic advice is hard but crucial. Even short naps can help.</p>
              <p><strong>Share night duties:</strong> If you have a partner, take turns with nighttime feedings and care if possible.</p>
              <p><strong>Optimize your sleep environment:</strong> Keep your bedroom dark, quiet, and cool.</p>
              <p><strong>Limit caffeine and screen time before bed.</strong></p>
              <p><strong>Accept help:</strong> If friends or family offer to watch the baby so you can nap, say yes!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="challenge-2">
            <AccordionTrigger className="text-xl font-medium hover:text-primary">
              <span className="flex items-center gap-2">
                <Zap className="text-primary h-6 w-6" />Coping with Stress
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-foreground/90">
              <p><strong>Identify your triggers:</strong> What situations or thoughts cause you the most stress?</p>
              <p><strong>Practice mindfulness:</strong> Even a few minutes of focusing on your breath can reduce stress.</p>
              <p><strong>Set realistic expectations:</strong> You don't have to do it all. Prioritize and let some things go.</p>
              <p><strong>Stay connected:</strong> Talk to your partner, friends, or other new moms. Support groups can be very helpful.</p>
              <p><strong>Engage in hobbies:</strong> If possible, make time for activities you enjoy, even for short periods.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="challenge-3">
            <AccordionTrigger className="text-xl font-medium hover:text-primary">
              <span className="flex items-center gap-2">
                <HeartHandshake className="text-primary h-6 w-6" />Nurturing Relationship Changes
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-foreground/90">
              <p><strong>Communicate openly:</strong> Talk with your partner about your feelings, needs, and expectations. Listen to theirs too.</p>
              <p><strong>Make time for each other:</strong> Even short, focused moments of connection can make a difference. Schedule "date moments" if not full dates.</p>
              <p><strong>Share responsibilities:</strong> Work as a team in caring for the baby and managing household tasks.</p>
              <p><strong>Be patient:</strong> Adjusting to new roles takes time. Show empathy and understanding for each other.</p>
              <p><strong>Seek counseling if needed:</strong> A therapist can help navigate relationship challenges during this transition.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <footer className="text-center mt-12 py-6 border-t">
        <p className="text-foreground/70">Remember, taking care of yourself is taking care of your baby. You are doing great.</p>
      </footer>
    </div>
  );
}
