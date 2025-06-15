"use client";

import type { buttonVariants } from "@/components/ui/button"; // Assuming sidebarMenuButtonVariants are similar or defined elsewhere
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { iconComponents, periodCycleNavLinks, pregnancyPostpartumNavLinks } from "@/config/nav-links"; // Import both link sets
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react"; // Import useState and useEffect

// Assuming sidebarMenuButtonVariants is defined in ui/sidebar.tsx or similar
// For this example, I'll assume a simplified variant definition if not directly available
// from ui/button. Ideally, this comes from where SidebarMenuButtonPrimitive gets its variants.
const sidebarMenuButtonVariants = ({ variant, size, className }: any) => cn("base-styles", className); // Placeholder

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { // Or your specific sidebar button variants
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string; // Changed to accept string directly for simplicity
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "ghost", // Default variant from ui/button, adjust if different for sidebar
      size = "default",  // Default size from ui/button
      tooltip,
      className,
      children, // Ensure children are passed through
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const actualButton = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive}
        className={cn(
          // Apply base button styling, specific sidebar button styling, and active/hover states
          "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-ring transition-all focus-visible:ring-2 active:bg-accent active:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          "group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center",
          "text-sidebar-foreground",
          "hover:bg-pink-100 hover:text-pink-600",
          "dark:hover:bg-gray-700 dark:hover:text-pink-400",
          isActive && "bg-pink-100 text-pink-700 dark:bg-pink-800/60 dark:text-pink-300 font-semibold",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );

    // Tooltip should only be active and rendered for collapsed desktop sidebar
    if (state === "collapsed" && !isMobile && tooltip) {
      return (
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{actualButton}</TooltipTrigger>
          <TooltipContent side="right" align="center" sideOffset={10}>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return actualButton;
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";


interface SidebarNavProps {
  // links: NavLinkType[]; // No longer needed as prop
}

export function SidebarNav({ /* links */ }: SidebarNavProps) {
  const pathname = usePathname();
  const [mode, setMode] = useState("pregnancy-postpartum"); // Default mode

  useEffect(() => {
    // Load mode from localStorage on component mount
    const storedMode = localStorage.getItem("sidebarMode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    // Save mode to localStorage whenever it changes
    localStorage.setItem("sidebarMode", mode);
  }, [mode]);

  const currentLinks = mode === "pregnancy-postpartum" ? pregnancyPostpartumNavLinks : periodCycleNavLinks;

  return (
    <SidebarMenu>
      <div className="px-2 py-4">
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pregnancy-postpartum">Pregnancy & Postpartum</SelectItem>
            <SelectItem value="period-cycle">Period & Cycle</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {currentLinks.map((link) => {
        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        const IconComponent = iconComponents[link.iconName];

        return (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={link.label}
            >
              <Link href={link.href}>
                {IconComponent ? <IconComponent className="h-5 w-5 shrink-0" /> : null}
                <span className="group-data-[state=collapsed]:hidden group-data-[collapsible=icon]:hidden">{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
