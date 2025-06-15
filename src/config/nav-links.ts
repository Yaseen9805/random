import type { LucideProps } from 'lucide-react';
import {
    Activity,
    Baby,
    BarChart3,
    Bell,
    BookOpen,
    Bot,
    CalendarCheck2,
    ClipboardList, Droplet,
    GraduationCap,
    Heart,
    Home,
    Music2,
    PieChart,
    Pill,
    ShoppingBag,
    Stethoscope,
    Thermometer,
    TrendingUp,
    Users
} from 'lucide-react';

// Define a type for the icon names for better type safety
export type IconName = 
  'Home' | 'Bot' | 'BookOpen' | 'Users' | 'BarChart3' | 'CalendarCheck2' | 
  'Baby' | 'ShoppingBag' | 'Music2' | 'Stethoscope' | 'Activity' | 
  'GraduationCap' | 'TrendingUp' | 'ClipboardList' | 'Droplet' | 
  'Thermometer' | 'Pill' | 'Bell' | 'PieChart' | 'Heart';

// Define a map from icon names to actual components for use in client components
export const iconComponents: Record<IconName, React.FC<LucideProps>> = {
  Home, Bot, BookOpen, Users, BarChart3, CalendarCheck2, Baby, 
  ShoppingBag, Music2, Stethoscope, Activity, GraduationCap, TrendingUp,
  ClipboardList, Droplet, Thermometer, Pill, Bell, PieChart, Heart
};

export interface NavLink {
  href: string;
  label: string;
  iconName: IconName;
  exact?: boolean;
}

export const pregnancyPostpartumNavLinks: NavLink[] = [
  { href: '/', label: 'Dashboard', iconName: 'Home', exact: true },
  { href: '/mood-tracker', label: 'Mood Tracker', iconName: 'BarChart3' },
  { href: '/ai-companion', label: 'AI Companion', iconName: 'Bot' },
  { href: '/exercises-wellbeing', label: 'Exercises & Well-being', iconName: 'Activity' },
  { href: '/educate', label: 'Educate', iconName: 'GraduationCap' },
  { href: '/growth', label: 'Growth', iconName: 'TrendingUp' },
  { href: '/community', label: 'Community', iconName: 'Users' },
  { href: '/ambient-music', label: 'Ambient Music', iconName: 'Music2'},
  { href: '/professional-help', label: 'Professional Help', iconName: 'Stethoscope'},
  { href: '/shop', label: 'Shop Essentials', iconName: 'ShoppingBag'},
];

export const periodCycleNavLinks: NavLink[] = [
  { href: '/periods', label: 'Dashboard', iconName: 'Home', exact: true },
  { href: '/periods/tracking', label: 'Cycle Tracking', iconName: 'CalendarCheck2' },
  { href: '/periods/symptoms', label: 'Symptom Logging', iconName: 'ClipboardList' },
  { href: '/periods/ovulation', label: 'Ovulation Prediction', iconName: 'Heart' },
  { href: '/periods/flow', label: 'Flow Tracking', iconName: 'Droplet' },
  { href: '/periods/temperature', label: 'Temperature Tracking', iconName: 'Thermometer' },
  { href: '/periods/medication', label: 'Medication Tracking', iconName: 'Pill' },
  { href: '/periods/education', label: 'Education', iconName: 'BookOpen' },
  { href: '/periods/reminders', label: 'Reminders', iconName: 'Bell' },
  { href: '/periods/analytics', label: 'Analytics', iconName: 'PieChart' },
  { href: '/periods/community', label: 'Community Support', iconName: 'Users' },
];
