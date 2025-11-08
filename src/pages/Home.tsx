import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import heroImage from '@/assets/bhelpuri-hero.jpg';
import basicImage from '@/assets/bhelpuri-basic.jpg';
import regularImage from '@/assets/bhelpuri-regular.jpg';
import premiumImage from '@/assets/bhelpuri-premium.jpg';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const products: Product[] = [
  {
    id: '1',
    name: 'Classic Bhelpuri',
    price: 50,
    description: 'Traditional street-style bhelpuri with tangy chutneys',
    image: basicImage,
  },
  {
    id: '2',
    name: 'Special Bhelpuri',
    price: 80,
    description: 'Extra crunchy with special house chutneys and toppings',
    image: regularImage,
  },
  {
    id: '3',
    name: 'Premium Bhelpuri',
    price: 100,
    description: 'Loaded with premium toppings, nuts, and special ingredients',
    image: premiumImage,
  },
];

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious Bhelpuri"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-left duration-700">
              Welcome to BhelpuriExpress
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-in fade-in slide-in-from-left duration-700 delay-100">
              Authentic Indian street food delivered to your hostel room
            </p>
            {!currentUser && (
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate('/auth')}
                className="animate-in fade-in slide-in-from-left duration-700 delay-200"
              >
                Order Now
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Menu</h2>
          <p className="text-xl text-muted-foreground">Choose your favorite Bhelpuri</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your order delivered to your hostel room within 30 minutes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Cash on Delivery</h3>
              <p className="text-muted-foreground">Pay when you receive your order. No online payment hassles</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Fresh & Tasty</h3>
              <p className="text-muted-foreground">Made fresh with quality ingredients every time</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
