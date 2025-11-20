import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Moon, Sun, Menu, X, Newspaper } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, type NewsCategory } from "@shared/schema";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setMobileMenuOpen(false);
    }
  };

  const getCategoryPath = (category: NewsCategory) => `/category/${category}`;
  const isActiveCategory = (category: NewsCategory) => location === getCategoryPath(category);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 cursor-pointer">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Live News
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.map((category) => (
              <Link key={category} href={getCategoryPath(category)} data-testid={`link-category-${category}`}>
                <div
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors hover-elevate active-elevate-2 cursor-pointer ${
                    isActiveCategory(category)
                      ? "text-primary font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  {category}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Search & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-64 rounded-full"
                data-testid="input-search"
              />
            </form>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="rounded-full"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 rounded-full"
                data-testid="input-search-mobile"
              />
            </form>

            {/* Mobile Categories */}
            <div className="flex flex-col gap-1 mb-4">
              {categories.map((category) => (
                <Link key={category} href={getCategoryPath(category)} data-testid={`link-category-${category}-mobile`}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-md text-sm font-medium capitalize transition-colors hover-elevate active-elevate-2 cursor-pointer ${
                      isActiveCategory(category)
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-foreground/80"
                    }`}
                  >
                    {category}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <Button
              variant="outline"
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start gap-2"
              data-testid="button-theme-toggle-mobile"
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
