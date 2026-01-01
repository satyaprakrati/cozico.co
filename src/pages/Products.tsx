import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const categories = [
  { id: 'clothing', name: 'Clothing' },
  { id: 'suits', name: 'Suits' },
  { id: 'shoes', name: 'Shoes' },
];

const subcategories = [
  { id: 'shirts', name: 'Shirts', parent: 'clothing' },
  { id: 't-shirts', name: 'T-Shirts', parent: 'clothing' },
  { id: 'pants', name: 'Pants', parent: 'clothing' },
  { id: 'shorts', name: 'Shorts', parent: 'clothing' },
  { id: 'joggers', name: 'Joggers', parent: 'clothing' },
  { id: 'wedding-suits', name: 'Wedding Suits', parent: 'suits' },
  { id: 'office-suits', name: 'Office Suits', parent: 'suits' },
  { id: 'casual-suits', name: 'Casual Suits', parent: 'suits' },
  { id: 'formal-shoes', name: 'Formal Shoes', parent: 'shoes' },
  { id: 'sneakers', name: 'Sneakers', parent: 'shoes' },
  { id: 'loafers', name: 'Loafers', parent: 'shoes' },
  { id: 'sports-shoes', name: 'Sports Shoes', parent: 'shoes' },
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '7', '8', '9', '10', '11', '12'];
const colors = ['White', 'Black', 'Navy', 'Olive', 'Grey', 'Brown', 'Beige', 'Blue'];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
  { id: 'rating', name: 'Top Rated' },
  { id: 'newest', name: 'Newest' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 35000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryParam = searchParams.get('category')?.toLowerCase();
  const filterParam = searchParams.get('filter');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category or subcategory
    if (categoryParam) {
      result = result.filter((p) => {
        const cat = p.category.toLowerCase();
        const subcat = p.subcategory?.toLowerCase().replace(/\s+/g, '-');
        return cat === categoryParam || subcat === categoryParam || cat.includes(categoryParam) || subcat?.includes(categoryParam);
      });
    }

    // Filter by special filters
    if (filterParam === 'bestsellers') {
      result = result.filter((p) => p.badge === 'Best Seller' || p.rating >= 4.7);
    } else if (filterParam === 'new') {
      result = result.filter((p) => p.badge === 'New Arrival' || p.badge === 'Trending');
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter((p) => p.badge === 'New Arrival').concat(
          result.filter((p) => p.badge !== 'New Arrival')
        );
        break;
    }

    return result;
  }, [categoryParam, filterParam, priceRange, selectedSizes, selectedColors, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 35000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchParams({});
  };

  const getPageTitle = () => {
    if (filterParam === 'bestsellers') return 'Best Sellers';
    if (filterParam === 'new') return 'New Arrivals';
    if (categoryParam) {
      const sub = subcategories.find((s) => s.id === categoryParam);
      if (sub) return sub.name;
      const cat = categories.find((c) => c.id === categoryParam);
      if (cat) return cat.name;
      return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    }
    return 'All Products';
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
          Categories
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`block w-full text-left py-1.5 text-sm transition-colors ${
                categoryParam === cat.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
          Price Range
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={35000}
            step={500}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Sizes */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
          Size
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`h-9 min-w-[40px] px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedSizes.includes(size)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Colors */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
          Color
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {colors.map((color) => (
            <label
              key={color}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleColor(color)}
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-[104px]">
        <div className="container-main py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {getPageTitle()}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-[140px]">
                <h2 className="text-lg font-semibold mb-6">Filters</h2>
                <FiltersContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`animate-fade-in`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">
                    No products found
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
