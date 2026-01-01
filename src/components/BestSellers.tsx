import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { getBestSellers } from '@/data/products';
import { Button } from '@/components/ui/button';

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = getBestSellers();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              Most loved pieces by our customers
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className={`flex-shrink-0 w-[280px] md:w-[320px] snap-start animate-slide-up stagger-${(index % 4) + 1}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
