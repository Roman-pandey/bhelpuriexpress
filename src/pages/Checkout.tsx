import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { z } from 'zod';

const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  hostel: z.string().trim().min(2, 'Hostel name is required').max(100),
  room: z.string().trim().min(1, 'Room number is required').max(20),
});

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    hostel: '',
    room: '',
  });
  const [loading, setLoading] = useState(false);
  const { cart, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [currentUser, cart, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      const result = checkoutSchema.safeParse(formData);
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      setLoading(true);

      const orderData = {
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        customerName: formData.name.trim(),
        mobile: formData.mobile.trim(),
        hostel: formData.hostel.trim(),
        room: formData.room.trim(),
        items: cart,
        total: getCartTotal(),
        paymentMethod: 'Cash on Delivery',
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (error: any) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Checkout</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostel">Hostel Name *</Label>
                  <Input
                    id="hostel"
                    name="hostel"
                    placeholder="Enter hostel name"
                    value={formData.hostel}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room Number *</Label>
                  <Input
                    id="room"
                    name="room"
                    placeholder="Enter room number"
                    value={formData.room}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-semibold text-foreground">Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{getCartTotal()}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
