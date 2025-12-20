import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Pencil, Trash2, Snowflake } from 'lucide-react';
import polarFleece from '@/assets/winter-polar-fleece.jpg';
import longSleeve from '@/assets/winter-long-sleeve.jpg';
import winterJacket from '@/assets/winter-jacket.jpg';
import sweatshirt from '@/assets/winter-sweatshirt.jpg';
import hoodie from '@/assets/winter-hoodie.jpg';
import zipHoodie from '@/assets/winter-zip-hoodie.jpg';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
}

const initialProducts: Product[] = [
  { id: '1', title: 'Duks Polar', description: 'Polar me cilësi të lartë për dimrin', image: polarFleece },
  { id: '2', title: 'Maicë me Mëngë të Gjata', description: 'Polo me logo të personalizuar', image: longSleeve },
  { id: '3', title: 'Duks me Jaka', description: 'Xhaketë me zinxhir për dimrin', image: winterJacket },
  { id: '4', title: 'Duks zero Jaka', description: 'Bluză klasike pa kapuç', image: sweatshirt },
  { id: '5', title: 'Duks me Kapuq', description: 'Bluză me kapuç klasike', image: hoodie },
  { id: '6', title: 'Duks me Patent dhe Kapuq', description: 'Bluză me zinxhir dhe kapuç', image: zipHoodie },
];

const WinterCollection = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ title: product.title, description: product.description, image: product.image });
    } else {
      setEditingProduct(null);
      setFormData({ title: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, title: formData.title, description: formData.description, image: formData.image || p.image }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        image: formData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setFormData({ title: '', description: '', image: '' });
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
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
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
              <Snowflake className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                Koleksioni Dimëror
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Veshje të ngrohta dhe cilësore për sezonin e dimrit
            </p>

            {/* Add Product Button */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => handleOpenModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    {editingProduct ? 'Ruaj Ndryshimet' : 'Shto'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-blue-200 relative">
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
                <div className="relative h-64 overflow-hidden bg-white">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{product.title}</h3>
                  <p className="text-slate-600">{product.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WinterCollection;
