import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Pencil, Trash2, Sun, Shirt, Pen, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: 'shirt' | 'pen' | 'star';
}

const summerImages = [
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/497735901_17884298808273506_440584737694089951_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzYzMTYyNjQ0Njg3MTU3MTg2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=eLkdTXWFa5wQ7kNvwHBgyhZ&_nc_oc=AdlZDPA1O82zOrj0clgVINcmhw8YgWIsCWIYSWGMXmG1aPTN8VkZbGOuYvon291mZFo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=FGnX-vU7VAdTmxI3I9bZuA&oh=00_AfmOZoabyKVOnvGNJn9xY33KSxOadJ995zFSbqUVjaBtnQ&oe=694C81E3",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/497712451_17884298775273506_5788175504279376857_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzYzMTYyNjI0MTMzMzk3MjY3Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=3bMgXJS-i5AQ7kNvwGqct1b&_nc_oc=AdneHpYRfBfbgfeSd1wasiBmUesGmrLi4TSL9Nk9o6CrgswJsZNrqE6en56gBbnm_mM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=is_5ksBSimaCKkMjjSV-uQ&oh=00_Aflh_pduwztABKBcvjbuD2p8feIxv3GDDPHdT311JOUnYA&oe=694C8121",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/497506656_17884298727273506_6045814413418892736_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzYzMTYyNTk0MzkyNDIwMTIzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=VJ4G5gqt9hoQ7kNvwHjDT4x&_nc_oc=AdmjA4APyVyazCRRJLGqbQZV7gB-QIzFHOqKL5yWNGTvZL9SAj9I4DHJaqTXR1rS1Pg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=xN5eCK3P2XicRvll2JFJSg&oh=00_Afn175v4sSEhCmeB-mBmj8kENuJURStw7hzMRZstWr-mBA&oe=694C7D37",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/496001820_17883477306273506_2259830112854397003_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzYyNjUzMDQ0Nzk0OTk4MjMyOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=2jvat6ZN6kAQ7kNvwHp2KN6&_nc_oc=AdkQ9L10Uv4L1ELtWPSxzLzE20vw9WQ9tAXadej7Q6iYRyh5lkNXESWeDbMuD63dHZs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=_NLMnJjrPl618LLVKMOgnA&oh=00_Afnncpeoy0d1psGjBA-Vd6E56D58yIPKqvk8611T2vWgnA&oe=694C9450",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/495644827_17883477267273506_7154838490328260606_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzYyNjUzMDI0MTE3OTA5OTAxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=2ZraRs2Px4kQ7kNvwEmkkex&_nc_oc=AdmTp1vxNE9PKNcGNxqNP0-CLVNUrpgMNXj63r_V0IY8rMOThhb3ACWlnwq9DfVh6g4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=JnXKM4L_N-au9S0SbnGY1w&oh=00_AfkJDCCBVG0YWfRBpT-Dwe6tdZozmWn5ZxtdeuKjY83SSg&oe=694C6FB0",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/496317466_17883477237273506_1640576990235801891_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzYyNjUzMDAwNzY4MjIwODU4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=BQYloXYNSVAQ7kNvwGoxF0u&_nc_oc=AdnXRBrg9BtdF6V4ms66ajmTojZ-fs6N226Ci2YRqmbLEDUwSgdyGYNgg7PpAuyFy8U&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=9JSzIyEs6ZK73cm3BZ1Uaw&oh=00_AfntGr_lejfBiCF4ZXRUiWtJraUXWeh1IpNlbF-Ad5A_Kg&oe=694C943D",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/494858006_17882898678273506_4748307659316253572_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzYyMjk1MjkxMjQ4NjA2MTIxMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=9B_MqMORcp4Q7kNvwEQnjr3&_nc_oc=Adn-7vViB2SPLX9qOgEFIW8FlsXo8JcdJ6msIOcu9GqqbI4uaxmuYAO1PbC2hbk5hsI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=Ohk21hstzDUv_HvjfVNJqA&oh=00_AfmSME5Hl-9cS2xZEb7dLF_DGEbhTwd5Zs5sbI8ZeOY24A&oe=694C6CE2",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/494924546_17882898654273506_2071036304949394889_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzYyMjk1Mjc1Mjc1ODUyNzkzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=wdyS9VpjD_oQ7kNvwHFpmUE&_nc_oc=AdmCmQKRMqI5WXf18NCaS2Mhi2okWdEuwDNb1cFGrojbSOz3gtsDs_UI8phJkxfgQ2g&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=cpysqt4Ii4iMmFciS-pYzg&oh=00_AfnVxNjP0iGv_vWrsrq6mDGuCzxuTOf7oIpcBWMzd_jsNg&oe=694C83D0",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/494593407_17882898618273506_1261940961287365567_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzYyMjk1MjU0NzU0ODExNTE2Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=h9Kl7ZRJO5gQ7kNvwGXST0I&_nc_oc=Adnsw9ZCq8BiCPtCY06PsgHAd5yfFbrgAa5gzIB06BBBKj5jNqjj99VZ8B0f-VqqE78&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=no56jr4MgWmbh53tkXJqLQ&oh=00_Afki7vtjUNWZyrtT20ItNSjuayo3-emjUwg2gxCwZR_58Q&oe=694C6744",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.82787-15/513873483_17889641445273506_3635541522653855117_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzY2NDIyOTc4OTgzNzg3MDYxOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=hjJDQHeOkFgQ7kNvwHJdSly&_nc_oc=Adnmr8nn4UirRmXmeRBc07Hou0IDRy_MPVYZg11Bf6tfq3uu9K3C9FD1vfCw85RbgEg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=wekfX7Eswyd7PJi2gVa6vg&oh=00_AflaQ5D3blGuTw3sILar2_IelNlaLdlyGreBP9fSkAqroQ&oe=694C715E",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.82787-15/513925142_17889641289273506_7820144026643545714_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=MzY2NDIyOTYyNTIxMTQxNjI1OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=VEA7qrriD5YQ7kNvwGg2JPn&_nc_oc=AdkSgx_gup1Z4c6XhjlkeeS9lT0tRtHpfLAxUlA6d1BRjYh8iLp49lYA4XxDsiSf-S0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=NZNS7Re-fXyrzE1oMjg67g&oh=00_AfkBq5iobabGsJqfu6D_l5G0KzNAm9CwGOkC0X1V4Oqggw&oe=694C7BF4",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.82787-15/513723357_17889641214273506_7442073897036887478_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzY2NDIyOTQxNzExNTI3MjUwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Q_R4bPcbuegQ7kNvwEIeTdx&_nc_oc=Adn0rHAo8xDMPQgKbdnM3Ahu5Sg87M9sp9umQ9p9Qpx40YxnSo4Q-0Myz7ssDE15Quo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=bkmMB99IqlpdNLCYwb_mpg&oh=00_AfnqHoPn-bxMc2FNOOk2HvOb1U6MEf6Pi1rBcEq0mmN7sg&oe=694C7097",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/510476929_17889196128273506_9047257194962723728_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzY2MTM5MjU5Mzk0OTg5MjM0NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=lQi3oB3WQ3AQ7kNvwFe-7uT&_nc_oc=Adk8W8CS04JNyPaGQFiZETUOTrdKKR5zlSBpGDvK4GfVJmyKY9RWR15L7_p_AecRtig&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=pRbtySMGf-2PrVugvQmQqg&oh=00_AfmLk0603A_iyixpMuzvmJmBYxwTOO9WUN0XAeNAZf8Iyg&oe=694C80D0",
  "https://instagram.fprn5-1.fna.fbcdn.net/v/t51.75761-15/510950643_17889196089273506_3900360866240304904_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzY2MTM5MjQwMTEzNzY5MTc3Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=gHAMRH_10NgQ7kNvwH-RMBP&_nc_oc=AdltSnyxdK000zoLKWylNChqnu-BDckefwwz-3FEO8tH7__6gGf2Vk-c_T_WuTO_Fkg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fprn5-1.fna&_nc_gid=0aw5vP63KT2XNoktCBibAQ&oh=00_AfnIb5BTUEOrEj9COZF9HR6Y6WnE3B1GSQJEKnW4woalXA&oe=694C899C"
];

const initialProducts: Product[] = summerImages.map((url, idx) => ({
  id: (idx + 1).toString(),
  title: `Produkt Veror #${idx + 1}`,
  description: 'Prodhuar enkas për sezonin e verës.',
  image: url,
  icon: ['shirt', 'pen', 'star'][idx % 3] as Product["icon"],
}));

const iconMap = {
  shirt: Shirt,
  pen: Pen,
  star: Star,
};

const SummerCollection = () => {
  const { isAdmin } = useAuth();
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
      // Default to the first image, unless user supplies a valid image, and auto-pick an icon round-robin
      const nextIdx = products.length % summerImages.length;
      const iconOptions: Product["icon"][] = ['shirt', 'pen', 'star'];
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title || `Produkt Veror #${products.length + 1}`,
        description: formData.description || 'Prodhuar enkas për sezonin e verës.',
        image: formData.image || summerImages[nextIdx],
        icon: formData.icon || iconOptions[products.length % 3],
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
              Produkte unike nga koleksioni veror, drejtpërdrejt nga eventet dhe mjediset tona. Shfleto fotot nga Instagrami i HOPE!
            </p>

            {/* Add Product Button - Only visible for admins */}
            {isAdmin && (
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
            )}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => {
              const IconComponent = iconMap[product.icon];
              return (
                <Card key={product.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-sky-200 relative">
                  {/* Edit/Delete buttons - Only visible for admins */}
                  {isAdmin && (
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
                  )}
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
