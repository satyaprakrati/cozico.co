import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/products';

export function FeaturedCollections() {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop by Collection</h2>
          <p className="section-subtitle mx-auto">
            Curated ensembles for every occasion in your life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collection/${collection.id}`}
              className={`group relative overflow-hidden rounded-2xl aspect-[4/5] animate-slide-up stagger-${index + 1}`}
            >
              {/* Background Image */}
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-display font-semibold text-cream mb-2">
                  {collection.name}
                </h3>
                <p className="text-cream/80 mb-4">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-cream font-medium group-hover:text-primary transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
