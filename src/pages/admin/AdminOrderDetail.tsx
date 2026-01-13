import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useOrder, useUpdateOrderStatus, getStatusLabel, getStatusColor, OrderStatus } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, User, Phone, Mail, MapPin, Package } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'En attente' },
  { value: 'confirmed', label: 'Confirmée' },
  { value: 'shipped', label: 'Expédiée' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' },
];

const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id || '');
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (id) {
      await updateStatus.mutateAsync({ id, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 lg:col-span-2" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Commande non trouvée</p>
          <Button variant="link" onClick={() => navigate('/admin/orders')}>
            Retour aux commandes
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/orders')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-display font-semibold text-foreground">
              Commande #{order.id.slice(0, 8)}
            </h1>
            <p className="text-muted-foreground mt-1">
              Passée le {format(new Date(order.created_at), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Articles commandés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name || 'Produit supprimé'}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price.toFixed(2)} MAD</p>
                      <p className="text-sm text-muted-foreground">
                        × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span>{order.total.toFixed(2)} MAD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info & Status */}
          <div className="space-y-6">
            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Statut de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                  disabled={updateStatus.isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Un email sera envoyé au client lors de la confirmation
                </p>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{order.customer_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <a href={`mailto:${order.email}`} className="text-accent hover:underline">
                    {order.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <a href={`tel:${order.phone}`} className="text-accent hover:underline">
                    {order.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{order.address}</p>
                    {order.city && <p className="text-muted-foreground">{order.city}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetail;
