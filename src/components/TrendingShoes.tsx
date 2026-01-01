import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

export function TrendingShoes() {
  const shoes = products.filter((p) => p.category === 'Shoes').slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="section-title">Trending Shoes</h2>
            <p className="section-subtitle">
              Step into style with our premium footwear
            </p>
          </div>
          
          <Button asChild variant="outline" className="hidden md:flex">
            <Link to="/products?category=shoes">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {shoes.map((product, index) => (
            <div key={product.id} className={`animate-slide-up stagger-${index + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link to="/products?category=shoes">
              View All Shoes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
