import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const { state, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`);
  };

  const shipping = cartTotal >= 2999 ? 0 : 199;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-[104px]">
        <div className="container-main py-8 lg:py-12">
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-8">
            Shopping Cart
          </h1>

          {state.items.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            Size: {item.selectedSize} | Color: {item.selectedColor}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                          <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-[140px] bg-card rounded-xl border border-border p-6">
                  <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cartCount} items)
                      </span>
                      <span className="font-medium">
                        ₹{cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-primary">FREE</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Add ₹{(2999 - cartTotal).toLocaleString()} more for free
                        shipping
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border mb-6">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Have a coupon?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button variant="outline" size="sm" className="h-10">
                        Apply
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full h-12 text-base" size="lg">
                    Proceed to Checkout
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
