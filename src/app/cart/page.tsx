
"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some items to proceed.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Checkout Initiated (Demo)",
      description: "This is a demo. No real payment will be processed.",
    });
    // In a real app, you would redirect to a checkout page or integrate a payment gateway.
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center space-y-6">
        <ShoppingCart className="h-24 w-24 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="text-foreground/80">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart} disabled={cartItems.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 shadow-md">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover w-full sm:w-24 h-auto sm:h-24 aspect-square"
                data-ai-hint={item.dataAiHint}
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 mt-2 sm:mt-0 sm:ml-4"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-1 shadow-xl h-fit sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" onClick={handleProceedToCheckout}>
              Proceed to Checkout (Demo)
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/shop">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
