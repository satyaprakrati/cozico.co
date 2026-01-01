import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Best Sellers', href: '/products?filter=bestsellers' },
  {
    name: 'Clothing',
    href: '/products?category=clothing',
    submenu: [
      { name: 'Shirts', href: '/products?category=shirts' },
      { name: 'T-Shirts', href: '/products?category=t-shirts' },
      { name: 'Pants', href: '/products?category=pants' },
      { name: 'Shorts', href: '/products?category=shorts' },
      { name: 'Joggers', href: '/products?category=joggers' },
    ],
  },
  {
    name: 'Suits',
    href: '/products?category=suits',
    submenu: [
      { name: 'Wedding Suits', href: '/products?category=wedding-suits' },
      { name: 'Office Suits', href: '/products?category=office-suits' },
      { name: 'Casual Suits', href: '/products?category=casual-suits' },
    ],
  },
  {
    name: 'Shoes',
    href: '/products?category=shoes',
    submenu: [
      { name: 'Formal Shoes', href: '/products?category=formal-shoes' },
      { name: 'Sneakers', href: '/products?category=sneakers' },
      { name: 'Loafers', href: '/products?category=loafers' },
      { name: 'Sports Shoes', href: '/products?category=sports-shoes' },
    ],
  },
  { name: 'Wedding Collection', href: '/collection/wedding' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, state } = useCart();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
        Free Shipping on Orders Above ₹2,999 | Use Code: COZICO10 for 10% Off
      </div>

      <nav className="container-main">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl lg:text-3xl font-display font-bold tracking-tight text-foreground">
              COZICO
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.href) ? 'text-primary' : 'text-foreground/80'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.name} asChild>
                        <Link to={subitem.href} className="w-full">
                          {subitem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              className="p-2 hover:bg-muted rounded-full transition-colors relative hidden sm:flex"
            >
              <Heart className="h-5 w-5" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link to="/cart" className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for shirts, suits, shoes..."
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-slide-down">
          <div className="container-main py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`block py-3 text-base font-medium ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-2 mt-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border flex gap-4">
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5" />
                Wishlist ({state.wishlist.length})
              </Link>
              <Link
                to="/account"
                className="flex items-center gap-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
