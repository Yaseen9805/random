"use client";

import { ThemeToggleButton } from "@/components/theme-toggle-button"; // Added import
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { ShoppingCart, UserCircle } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300",
        "bg-background/80 dark:bg-background/60",
        "border-b border-border",
        "lg:pl-[20px]", // Offset for the fixed sidebar on desktop
      )}>
      <div className="container flex h-16 items-center justify-start">
        <Link href="/" className="flex items-center gap-2 font-bold text-heading-color text-lg md:text-xl">
          SwaSakhi
        </Link>
        <div className="flex items-center gap-2 pr-4 sm:pr-8 ml-auto">
          <ThemeToggleButton /> {/* Added button here */}
          <Button asChild variant="ghost" size="icon" className="rounded-full relative">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">User Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
