import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

export function CategoryGrid() {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle mx-auto">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className={`group relative aspect-[3/4] rounded-xl overflow-hidden animate-slide-up stagger-${index + 1}`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="text-xl lg:text-2xl font-display font-semibold text-cream mb-1">
                  {category.name}
                </h3>
                <p className="text-cream/70 text-sm mb-3">
                  {category.count} Products
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-cream font-medium group-hover:text-primary transition-colors">
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
