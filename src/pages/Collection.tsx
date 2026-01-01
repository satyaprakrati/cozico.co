import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { collections } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Collection() {
  const { id } = useParams<{ id: string }>();
  const collection = collections.find((c) => c.id === id);

  if (!collection) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-[104px] flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Collection Not Found</h1>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-[104px]">
        {/* Hero Banner */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={collection.image}
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="container-main">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cream mb-4 animate-slide-up">
                {collection.name}
              </h1>
              <p className="text-xl text-cream/80 max-w-xl mx-auto animate-slide-up stagger-1">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="container-main py-12 lg:py-16">
          <div className="flex items-center justify-between mb-8">
            <Button asChild variant="ghost" className="-ml-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <p className="text-muted-foreground">
              {collection.products.length} products
            </p>
          </div>

          {collection.products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {collection.products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No products in this collection yet
              </p>
              <Button asChild>
                <Link to="/products">Browse All Products</Link>
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
