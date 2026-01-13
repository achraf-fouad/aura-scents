import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProduct, useCreateProduct, useUpdateProduct, uploadProductImage, ProductInput } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const categories = [
  { value: 'femme', label: 'Femme' },
  { value: 'homme', label: 'Homme' },
  { value: 'unisexe', label: 'Unisexe' },
];

const intensities = [
  { value: 'légère', label: 'Légère' },
  { value: 'modérée', label: 'Modérée' },
  { value: 'intense', label: 'Intense' },
];

const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== 'new';
  const navigate = useNavigate();

  const { data: existingProduct, isLoading: productLoading } = useProduct(id || '');
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    price: 0,
    description: '',
    category: 'unisexe',
    intensity: '',
    volume: '',
    top_notes: [],
    heart_notes: [],
    base_notes: [],
    images: [],
    is_bestseller: false,
    is_new: false,
  });

  const [notesInput, setNotesInput] = useState({
    top: '',
    heart: '',
    base: '',
  });

  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingProduct && isEditing) {
      setFormData({
        name: existingProduct.name,
        price: existingProduct.price,
        description: existingProduct.description || '',
        category: existingProduct.category,
        intensity: existingProduct.intensity || '',
        volume: existingProduct.volume || '',
        top_notes: existingProduct.top_notes || [],
        heart_notes: existingProduct.heart_notes || [],
        base_notes: existingProduct.base_notes || [],
        images: existingProduct.images || [],
        is_bestseller: existingProduct.is_bestseller || false,
        is_new: existingProduct.is_new || false,
      });
      setNotesInput({
        top: existingProduct.top_notes?.join(', ') || '',
        heart: existingProduct.heart_notes?.join(', ') || '',
        base: existingProduct.base_notes?.join(', ') || '',
      });
    }
  }, [existingProduct, isEditing]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map((file) => uploadProductImage(file));
      const urls = await Promise.all(uploadPromises);
      
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
      }));
      
      toast({
        title: 'Images uploadées',
        description: `${urls.length} image(s) uploadée(s) avec succès.`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: "Impossible d'uploader les images.",
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData: ProductInput = {
      ...formData,
      top_notes: notesInput.top.split(',').map((n) => n.trim()).filter(Boolean),
      heart_notes: notesInput.heart.split(',').map((n) => n.trim()).filter(Boolean),
      base_notes: notesInput.base.split(',').map((n) => n.trim()).filter(Boolean),
    };

    try {
      if (isEditing && id) {
        await updateProduct.mutateAsync({ id, ...productData });
      } else {
        await createProduct.mutateAsync(productData);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && productLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-96" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-display font-semibold text-foreground">
              {isEditing ? 'Modifier le produit' : 'Nouveau produit'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? 'Modifiez les informations du produit' : 'Ajoutez un nouveau parfum au catalogue'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (MAD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Intensité</Label>
                  <Select
                    value={formData.intensity || ''}
                    onValueChange={(value) => setFormData({ ...formData, intensity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {intensities.map((int) => (
                        <SelectItem key={int.value} value={int.value}>
                          {int.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume</Label>
                  <Input
                    id="volume"
                    placeholder="ex: 100ml"
                    value={formData.volume || ''}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Olfactory Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes olfactives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="top_notes">Notes de tête (séparées par des virgules)</Label>
                <Input
                  id="top_notes"
                  placeholder="ex: Bergamote, Citron, Pamplemousse"
                  value={notesInput.top}
                  onChange={(e) => setNotesInput({ ...notesInput, top: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heart_notes">Notes de cœur (séparées par des virgules)</Label>
                <Input
                  id="heart_notes"
                  placeholder="ex: Rose, Jasmin, Iris"
                  value={notesInput.heart}
                  onChange={(e) => setNotesInput({ ...notesInput, heart: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base_notes">Notes de fond (séparées par des virgules)</Label>
                <Input
                  id="base_notes"
                  placeholder="ex: Musc, Ambre, Bois de santal"
                  value={notesInput.base}
                  onChange={(e) => setNotesInput({ ...notesInput, base: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images?.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Ajouter</span>
                    </>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Best-seller</Label>
                  <p className="text-sm text-muted-foreground">
                    Afficher ce produit dans la section best-sellers
                  </p>
                </div>
                <Switch
                  checked={formData.is_bestseller || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_bestseller: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Nouveau</Label>
                  <p className="text-sm text-muted-foreground">
                    Marquer ce produit comme nouveauté
                  </p>
                </div>
                <Switch
                  checked={formData.is_new || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_new: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Mise à jour...' : 'Création...'}
                </>
              ) : (
                isEditing ? 'Mettre à jour' : 'Créer le produit'
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProductForm;
