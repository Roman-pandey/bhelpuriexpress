import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';

interface Order {
  id: string;
  customerName: string;
  mobile: string;
  hostel: string;
  room: string;
  items: any[];
  total: number;
  status: string;
  createdAt: any;
  userEmail: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simple admin check - in production, use proper role-based access control
    if (!currentUser || currentUser.email !== 'admin@bhelpuri.com') {
      navigate('/');
      return;
    }

    // Set up real-time listener for orders
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-secondary';
      case 'processing':
        return 'bg-primary';
      case 'delivered':
        return 'bg-accent';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Admin Dashboard</h1>
        <div className="mb-6">
          <p className="text-muted-foreground">
            Total Orders: <span className="font-semibold text-foreground">{orders.length}</span>
          </p>
        </div>
        <div className="grid gap-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No orders yet</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{order.customerName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.createdAt?.toDate
                          ? format(order.createdAt.toDate(), 'PPpp')
                          : 'Just now'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">{order.userEmail}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mobile</p>
                        <p className="font-medium">{order.mobile}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hostel</p>
                        <p className="font-medium">{order.hostel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Room</p>
                        <p className="font-medium">{order.room}</p>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <p className="font-semibold mb-2 text-foreground">Items:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm flex justify-between">
                            <span className="text-muted-foreground">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="font-medium">₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total:</span>
                      <span className="text-xl font-bold text-primary">₹{order.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
