import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Search, Eye, Trash2, ShoppingCart, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

/* ---------------- TYPES ---------------- */
type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

type Order = {
  id: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city?: string;
  };
  total: number;
  status: OrderStatus;
  createdAt: string;
};

/* ---------------- STATUS HELPERS ---------------- */
const getStatusLabel = (status: OrderStatus) => {
  if (status === 'confirmed') return 'Confirmée';
  if (status === 'cancelled') return 'Annulée';
  return 'En attente';
};

const getStatusColor = (status: OrderStatus) => {
  if (status === 'confirmed') return 'bg-green-100 text-green-700';
  if (status === 'cancelled') return 'bg-red-100 text-red-700';
  return 'bg-yellow-100 text-yellow-700';
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  /* ---------------- LOAD ORDERS ---------------- */
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
    setIsLoading(false);
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredOrders = orders.filter(order => {
    const fullName = `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery)
    );
  });

  /* ---------------- UPDATE STATUS ---------------- */
  const updateOrderStatus = (id: number, status: OrderStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    toast({
      title: 'Commande mise à jour',
      description: `Statut : ${getStatusLabel(status)}`,
    });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = () => {
    if (!orderToDelete) return;

    const updatedOrders = orders.filter(o => o.id !== orderToDelete.id);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    toast({
      title: 'Commande supprimée',
      variant: 'destructive',
    });

    setOrderToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-semibold">Commandes</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les commandes de vos clients
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Orders Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune commande trouvée</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <p className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.city || '-'}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-sm">{order.customer.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.phone}
                      </p>
                    </TableCell>

                    <TableCell className="font-semibold">
                      {order.total.toFixed(0)} MAD
                    </TableCell>

                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {format(new Date(order.createdAt), 'dd MMM yyyy', { locale: fr })}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        <Link to={`/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setOrderToDelete(order)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!orderToDelete} onOpenChange={() => setOrderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la commande ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la commande de{' '}
              <strong>
                {orderToDelete?.customer.firstName} {orderToDelete?.customer.lastName}
              </strong>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminOrders;
