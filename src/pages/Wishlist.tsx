import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { state, removeFromWishlist } = useCart();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-[104px]">
        <div className="container-main py-8 lg:py-12">
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-8">
            My Wishlist
          </h1>

          {state.wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Save your favorite items here for later.
              </p>
              <Button asChild size="lg">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-8">
                {state.wishlist.length} items saved
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {state.wishlist.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
