import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { AppHeader } from './app-header';
import { SidebarNav } from './sidebar-nav';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true} collapsible="icon">
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className={cn(
          "group",
          "bg-white/60 dark:bg-gray-900/70 backdrop-blur-md",
          "border-r border-pink-200 dark:border-gray-700",
          "shadow-xl",
          "rounded-r-3xl",
          "transition-all duration-300 ease-in-out",
          "text-sidebar-foreground dark:text-sidebar-foreground"
        )}
      >
        <SidebarHeader className="p-4 flex items-start justify-start">
          {/* Desktop Sidebar Trigger, now on the left */}
          <SidebarTrigger className="hidden md:flex text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mr-2" />
          {/* This Link will only be visible on mobile when sidebar is open as a sheet */}
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity text-heading-color md:hidden">
            SwaSakhi
          </Link>
        </SidebarHeader>
        <SidebarContent> {/* SidebarContent already has p-4 and flex flex-col, overflow-auto, flex-1 */}
          <SidebarNav />
          <div className="mt-auto pt-4 border-t border-sidebar-border -mx-4 px-4"> {/* Pushes logout to bottom of scrollable content */}
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-sidebar-foreground",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "group-data-[state=collapsed]:w-auto group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:p-2 group-data-[state=collapsed]:mx-auto" 
              )}
              // onClick={() => console.log("Logout clicked")} // Placeholder for actual logout logic
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="group-data-[state=collapsed]:hidden">Logout</span>
            </Button>
          </div>
        </SidebarContent>
        <SidebarFooter> 
          {/* Footer is effectively empty here, its mt-auto pushes it to the bottom of the overall sidebar if SidebarContent wasn't flex-1 */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-transparent">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
    
