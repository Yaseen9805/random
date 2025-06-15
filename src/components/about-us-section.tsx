"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Sohail Mohammed Ayan',
    role: 'Project Lead & Full-Stack Developer',
    bio: 'Leading the development and implementation of SwaSakhi.',
    imageUrl: 'https://placehold.co/150x150.png',
    aiHint: 'male professional'
  },
  {
    name: 'Syed Yaseenuddin',
    role: 'Frontend Specialist & UI/UX Designer',
    bio: 'Focused on crafting intuitive and engaging user experiences.',
    imageUrl: 'https://placehold.co/150x150.png',
    aiHint: 'male designer'
  },
  {
    name: 'Mohammed Ali Khan',
    role: 'Backend Developer & AI Integration',
    bio: 'Expert in building robust backend systems and integrating AI features.',
    imageUrl: 'https://placehold.co/150x150.png',
    aiHint: 'male professional'
  },
  {
    name: 'Mohammed Abdul Sohail',
    role: 'QA & Content Strategist',
    bio: 'Ensuring quality and developing meaningful content for our users.',
    imageUrl: 'https://placehold.co/150x150.png',
    aiHint: 'male professional'
  }
];

export function AboutUsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
