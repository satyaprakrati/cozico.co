import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The wedding suit I bought was absolutely perfect. The fit was impeccable and I received so many compliments. COZICO has become my go-to for formal wear.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    product: 'Italian Wool Wedding Suit',
  },
  {
    id: 2,
    name: 'Arjun Patel',
    location: 'Delhi',
    rating: 5,
    text: 'Outstanding quality and customer service. The Oxford shoes are comfortable and stylish. Worth every rupee spent. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    product: 'Leather Oxford Shoes',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    location: 'Bangalore',
    rating: 5,
    text: 'Finally found a brand that understands men\'s fashion. The casual collection is perfect for both office and weekends. Premium quality at reasonable prices.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    product: 'Premium Oxford Shirt',
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Join thousands of satisfied gentlemen who trust COZICO
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow animate-slide-up stagger-${index + 1}`}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Product */}
              <p className="text-sm text-primary font-medium mb-4">
                Purchased: {testimonial.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
