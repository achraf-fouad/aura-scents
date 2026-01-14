import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { useProducts } from '@/hooks/useProducts';
import { Package, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';

/* ------------------ TYPES ------------------ */
type Order = {
  id: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  total: number;
  status: 'pending' | 'confirmed';
  createdAt: string;
};

/* ------------------ STATUS HELPERS ------------------ */
const getStatusLabel = (status: string) =>
  status === 'confirmed' ? 'Confirmée' : 'En attente';

const getStatusColor = (status: string) =>
  status === 'confirmed'
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700';

const AdminDashboard: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useProducts();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  /* ------------------ LOAD ORDERS ------------------ */
  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );
    setOrders(storedOrders);
    setOrdersLoading(false);
  }, []);

  /* ------------------ STATS ------------------ */
  const totalProducts = products?.length || 0;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
  const recentOrders = orders.slice(-5).reverse();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de votre boutique
          </p>
        </div>

        {/* ------------------ STATS ------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsLoading ? (
            <Skeleton className="h-32" />
          ) : (
            <StatCard
              title="Total Produits"
              value={totalProducts}
              icon={Package}
              description="Produits en catalogue"
            />
          )}

          {ordersLoading ? (
            <Skeleton className="h-32" />
          ) : (
            <StatCard
              title="Total Commandes"
              value={totalOrders}
              icon={ShoppingCart}
              description="Toutes les commandes"
            />
          )}

          {ordersLoading ? (
            <Skeleton className="h-32" />
          ) : (
            <StatCard
              title="En Attente"
              value={pendingOrders}
              icon={Clock}
              description="À traiter"
            />
          )}

          {ordersLoading ? (
            <Skeleton className="h-32" />
          ) : (
            <StatCard
              title="Confirmées"
              value={confirmedOrders}
              icon={CheckCircle}
              description="Commandes confirmées"
            />
          )}
        </div>

        {/* ------------------ RECENT ORDERS ------------------ */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-display">
              Commandes Récentes
            </CardTitle>
            <Link
              to="/admin/orders"
              className="text-sm text-accent hover:underline"
            >
              Voir tout
            </Link>
          </CardHeader>

          <CardContent>
            {ordersLoading ? (
              <Skeleton className="h-20" />
            ) : recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucune commande pour le moment
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <Link
                    key={order.id}
                    to={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50"
                  >
                    <div>
                      <p className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        {order.total.toFixed(0)} MAD
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
