import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  useOrder,
  useUpdateOrderStatus,
  getStatusLabel,
  getStatusColor,
  OrderStatus,
} from '@/hooks/useOrders';
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
import { toast } from '@/hooks/use-toast';

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

  const { data: order, isLoading } = useOrder(id ?? '');
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!id || !order || order.status === newStatus) return;

    try {
      await updateStatus.mutateAsync({ id, status: newStatus });

      toast({
        title: 'Statut mis à jour ✅',
        description: `Commande ${getStatusLabel(newStatus)}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur ❌',
        description: 'Impossible de mettre à jour le statut.',
        variant: 'destructive',
      });
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
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/orders')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1">
            <h1 className="text-3xl font-display font-semibold">
              Commande #{order.id.slice(0, 8)}
            </h1>
            <p className="text-muted-foreground mt-1">
              Passée le{' '}
              {format(new Date(order.created_at), "d MMMM yyyy 'à' HH:mm", {
                locale: fr,
              })}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ITEMS */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Articles commandés
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="w-16 h-16 bg-secondary rounded overflow-hidden">
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-6 w-6 m-auto text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">
                      {item.product?.name || 'Produit supprimé'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantité: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {item.price.toFixed(2)} MAD
                    </p>
                    <p className="text-sm text-muted-foreground">
                      × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{order.total.toFixed(2)} MAD</span>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* STATUS */}
            <Card>
              <CardHeader>
                <CardTitle>Statut</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={order.status}
                  onValueChange={(v) =>
                    handleStatusChange(v as OrderStatus)
                  }
                  disabled={updateStatus.isPending}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {order.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      className="w-full"
                      onClick={() => handleStatusChange('confirmed')}
                      disabled={updateStatus.isPending}
                    >
                      Confirmer
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleStatusChange('cancelled')}
                      disabled={updateStatus.isPending}
                    >
                      Annuler
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* CUSTOMER */}
            <Card>
              <CardHeader>
                <CardTitle>Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <User className="h-5 w-5" />
                  {order.customer_name}
                </div>
                <div className="flex gap-2">
                  <Mail className="h-5 w-5" />
                  {order.email}
                </div>
                <div className="flex gap-2">
                  <Phone className="h-5 w-5" />
                  {order.phone}
                </div>
                <div className="flex gap-2">
                  <MapPin className="h-5 w-5" />
                  {order.address} – {order.city}
                </div>
              </CardContent>
            </Card>

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
