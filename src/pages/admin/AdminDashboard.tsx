import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { useProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';
import { Package, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusLabel, getStatusColor } from '@/hooks/useOrders';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const confirmedOrders = orders?.filter(o => o.status === 'confirmed').length || 0;

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Vue d'ensemble de votre boutique</p>
        </div>

        {/* Stats Grid */}
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

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-display">Commandes Récentes</CardTitle>
            <Link 
              to="/admin/orders" 
              className="text-sm text-accent hover:underline"
            >
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucune commande pour le moment
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{order.customer_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(order.created_at), { 
                          addSuffix: true,
                          locale: fr 
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-foreground">
                        {order.total.toFixed(2)} MAD
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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
