
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause } from 'lucide-react'; // Removed Volume2 as it's not used for individual track volume here
import { CloudRain, Flame, Waves, Wind, Trees } from 'lucide-react';

interface Sound {
  id: string;
  name: string;
  src: string; // Path to the audio file, e.g., '/audio/rain.mp3'
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// IMPORTANT: Place corresponding audio files in the `public/audio/` directory.
// For example, create `public/audio/rain.mp3`, `public/audio/campfire.mp3`, etc.
const sounds: Sound[] = [
  { id: 'rain', name: 'Rain', src: '/audio/rain.mp3', icon: CloudRain },
  { id: 'campfire', name: 'Campfire', src: '/audio/campfire.mp3', icon: Flame },
  { id: 'waves', name: 'Waves', src: '/audio/waves.mp3', icon: Waves },
  { id: 'wind', name: 'Wind', src: '/audio/wind.mp3', icon: Wind },
  { id: 'forest', name: 'Forest', src: '/audio/forest.mp3', icon: Trees },
];

export function AmbientMusicPlayer() {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    sounds.forEach(sound => {
      if (typeof window !== "undefined") { // Ensure Audio is only created on the client
        audioRefs.current[sound.id] = new Audio(sound.src);
        audioRefs.current[sound.id]!.loop = true;
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = ''; // Release audio resources
        }
      });
    };
  }, []);

  const togglePlay = (soundId: string) => {
    const currentAudio = audioRefs.current[soundId];
    if (playingSound === soundId) {
      currentAudio?.pause();
      setPlayingSound(null);
    } else {
      // Pause any other playing sound
      Object.values(audioRefs.current).forEach((audio, index) => {
        if (sounds[index].id !== soundId) {
          audio?.pause();
        }
      });
      if (playingSound) {
         const previouslyPlayingAudio = audioRefs.current[playingSound];
         previouslyPlayingAudio?.pause();
      }


      currentAudio?.play().catch(error => {
        console.error("Error playing audio:", error);
        // Optionally, inform the user that the audio file might be missing
        // alert(`Could not play ${sounds.find(s => s.id === soundId)?.name}. Make sure the audio file exists at ${currentAudio?.src}`);
      });
      setPlayingSound(soundId);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {sounds.map((sound) => (
        <Card key={sound.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center p-6">
          <CardHeader className="p-0 mb-4">
            <sound.icon className="h-16 w-16 text-primary" />
          </CardHeader>
          <CardContent className="p-0 text-center">
            <CardTitle className="text-xl mb-4">{sound.name}</CardTitle>
            <Button
              onClick={() => togglePlay(sound.id)}
              variant={playingSound === sound.id ? "secondary" : "default"}
              size="lg"
              className="w-32 bg-primary hover:bg-primary/90 text-primary-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              data-state={playingSound === sound.id ? "active" : "inactive"}
              aria-pressed={playingSound === sound.id}
            >
              {playingSound === sound.id ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
              {playingSound === sound.id ? 'Pause' : 'Play'}
            </Button>
          </CardContent>
        </Card>
      ))}
      {/* Removed the instructional card that was here */}
    </div>
  );
}
