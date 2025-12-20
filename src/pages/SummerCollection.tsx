import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Pencil, Trash2, Sun, Shirt, Pen, Star } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: 'shirt' | 'pen' | 'star';
}

const initialProducts: Product[] = [
  { 
    id: '1', 
    title: 'Bluza Verore', 
    description: 'Bluza të lehta dhe të freskëta për ditët e nxehta të verës.', 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
    icon: 'shirt'
  },
  { 
    id: '2', 
    title: 'Stilolapsa për Verë', 
    description: 'Stilolapsa elegante për konferencat dhe ngjarjet verore.', 
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop',
    icon: 'pen'
  },
  { 
    id: '3', 
    title: 'Broshura Verore', 
    description: 'Materiale marketingu të gjalla për promovime verore.', 
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop',
    icon: 'star'
  },
];

const iconMap = {
  shirt: Shirt,
  pen: Pen,
  star: Star,
};

const SummerCollection = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '', icon: 'shirt' as Product['icon'] });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ title: product.title, description: product.description, image: product.image, icon: product.icon });
    } else {
      setEditingProduct(null);
      setFormData({ title: '', description: '', image: '', icon: 'shirt' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, title: formData.title, description: formData.description, image: formData.image || p.image, icon: formData.icon }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        image: formData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
        icon: formData.icon,
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setFormData({ title: '', description: '', image: '', icon: 'shirt' });
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      {/* Header */}
      <header className="py-6 px-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/9ae32d82-5a3b-432f-a7b3-72384eeb9b4b.png" 
              alt="HOPE Logo" 
              className="h-12 w-auto"
            />
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-sky-300 text-sky-600 hover:bg-sky-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kthehu
            </Button>
          </Link>
        </div>
      </header>

      {/* Collection Content */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sun className="h-10 w-10 text-sky-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                Koleksioni Veror
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Produkte të freskëta dhe të gjalla për sezonin e verës
            </p>

            {/* Add Product Button */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => handleOpenModal()}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Shto Produkt
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? 'Ndrysho Produktin' : 'Shto Produkt të Ri'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titulli</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Emri i produktit"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Përshkrimi</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Përshkrim i shkurtër"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">URL e Imazhit (opsionale)</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Anulo</Button>
                  </DialogClose>
                  <Button onClick={handleSave} className="bg-sky-500 hover:bg-sky-600">
                    {editingProduct ? 'Ruaj Ndryshimet' : 'Shto'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => {
              const IconComponent = iconMap[product.icon];
              return (
                <Card key={product.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-sky-200 relative">
                  <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => handleOpenModal(product)}
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-sky-200 to-blue-300">
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <IconComponent className="h-12 w-12 text-sky-600 mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">{product.title}</h3>
                    <p className="text-slate-600">{product.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummerCollection;
