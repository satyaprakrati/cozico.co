import { Shield, Truck, RefreshCw, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Handpicked fabrics and meticulous craftsmanship in every piece.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on all orders above ₹2,999.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns and exchanges.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our style experts are here to help anytime.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
            Why Choose COZICO
          </h2>
          <p className="text-primary-foreground/80 text-lg mt-4 max-w-2xl mx-auto">
            We're committed to providing an exceptional shopping experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center animate-slide-up stagger-${index + 1}`}
            >
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
