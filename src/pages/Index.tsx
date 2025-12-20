import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Palette, Shirt, CreditCard, Coffee, Pen, Users, Star, Phone, Instagram, Facebook, Snowflake, Sun } from 'lucide-react';
const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
  const products = [{
    icon: Shirt,
    title: "Bluza të Personalizuara",
    description: "Bluza me cilësi premium me dizajnet tuaja unike. Perfekte për ngjarje, ekipe, ose stil personal.",
    image: "photo-1521572163474-6864f9cf17ab",
    color: "from-sky-200 to-blue-300"
  }, {
    icon: Coffee,
    title: "Kupa të Personalizuara",
    description: "Filloni çdo mëngjes me dizajnin tuaj të preferuar. Të sigurta për larëse enësh dhe me ngjyra të gjalla.",
    image: "photo-1544787219-7f47ccb76574",
    color: "from-blue-200 to-slate-300"
  }, {
    icon: CreditCard,
    title: "Kartëvizita",
    description: "Karta profesionale që lënë përshtypje të qëndrueshme. Dallohu me përfundime premium.",
    image: "photo-1586953208448-b95a79798f07",
    color: "from-cyan-200 to-blue-300"
  }, {
    icon: Pen,
    title: "Stilolapsa të Personalizuar",
    description: "Instrumente elegante shkrimi me logon ose mesazhin tuaj. Perfekte për dhurata korporative.",
    image: "photo-1586953208448-b95a79798f07",
    color: "from-slate-200 to-blue-300"
  }, {
    icon: Users,
    title: "Bluza me Kapuç për Ekipe",
    description: "Bluza të rehatshme për ekipe, ngjarje, ose veshje të përditshme. Komoditeti takon stilin.",
    image: "photo-1521572163474-6864f9cf17ab",
    color: "from-sky-200 to-slate-300"
  }, {
    icon: Palette,
    title: "Menutë e Kafiterisë",
    description: "Dizajne menuje tërheqëse që shfaqin ofertat tuaja në mënyrë të bukur dhe profesionale.",
    image: "photo-1558618666-fcd25c85cd64",
    color: "from-blue-200 to-cyan-300"
  }, {
    icon: Star,
    title: "Shtypje Broshurash",
    description: "Broshura me cilësi të lartë që tregojnë historinë tuaj dhe paraqesin biznesin tuaj profesionalisht.",
    image: "photo-1542744094-3a31f272c490",
    color: "from-slate-200 to-sky-300"
  }];
  const testimonials = [{
    name: "Arlinda Krasniqi",
    role: "Koordinatore Eventesh",
    content: "HOPE dha cilësi të shkëlqyer dhe kohë të shpejtë realizimi! Bluzat e eventit tonë dukeshin fantastike.",
    rating: 5
  }, {
    name: "Burim Hoxha",
    role: "Pronar Biznesi të Vogël",
    content: "Kartëvizitat tejkaluan pritjet tona. Dizajn profesional dhe tërheqës!",
    rating: 5
  }, {
    name: "Ermira Berisha",
    role: "Drejtoreshë Marketingu",
    content: "Shërbim i shkëlqyer dhe dizajne të bukura. Kupat e ekipit tonë janë hit i madh në zyrë!",
    rating: 5
  }];
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      {/* Header */}
      <header className="py-6 px-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/9ae32d82-5a3b-432f-a7b3-72384eeb9b4b.png" alt="HOPE Logo" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">Shërbimet</a>
            <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">Rreth Nesh</a>
            <a href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors">Vlerësimet</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Kontakti</a>
          </nav>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Kërko Ofertë
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-100/30 via-blue-100/30 to-slate-100/30"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="scroll-animate opacity-0 translate-y-8 mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-slate-600 bg-clip-text text-transparent">
                Sjellim Vizionin Tuaj
              </span>
              <br />
              <span className="text-slate-800">Në Jetë</span>
            </h1>
            <p className="scroll-animate opacity-0 translate-y-8 mx-auto mb-8 max-w-2xl text-xl text-slate-600 leading-relaxed">Në Hope Print, ne transformojmë idetë tuaja krijuese në produkte të shtypura me cilësi të lartë. Nga veshjet e personalizuara deri te materialet profesionale, ne sjellim markën tuaj në jetë me precizion dhe kujdes.</p>
            <div className="scroll-animate opacity-0 translate-y-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Fillo Projektin Tënd
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-blue-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                Shiko Portofolio
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-sky-300 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-blue-300 to-slate-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-slate-300 to-sky-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Collections Section */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="scroll-animate opacity-0 translate-y-8 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
              Koleksionet Tona
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Zgjidhni koleksionin e duhur për sezonin tuaj
            </p>
            
            {/* Collection Links */}
            <div className="flex justify-center gap-4 mb-12">
              <Link to="/collections/winter">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg transition-all duration-300 border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                  <Snowflake className="mr-2 h-5 w-5" />
                  Koleksioni Dimëror
                </Button>
              </Link>
              <Link to="/collections/summer">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg transition-all duration-300 border-sky-300 text-sky-600 hover:bg-sky-500 hover:text-white hover:shadow-lg">
                  <Sun className="mr-2 h-5 w-5" />
                  Koleksioni Veror
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="scroll-animate opacity-0 translate-y-8 text-4xl font-bold text-slate-900 mb-4">
              Shërbimet Tona Krijuese
            </h2>
            <p className="scroll-animate opacity-0 translate-y-8 text-xl text-slate-600 max-w-2xl mx-auto">
              Zbuloni gamën tonë gjithëpërfshirëse të zgjidhjeve të shtypjes, secila e punuar me kujdes të detajeve dhe cilësi profesionale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => <Card key={index} className="scroll-animate opacity-0 translate-y-8 group hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                <div className={`h-48 bg-gradient-to-br ${product.color} relative overflow-hidden`}>
                  <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=500&q=80`} alt={product.title} className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
                  {/* Logo overlay for product mockup */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 p-2 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                      <img src="/lovable-uploads/9ae32d82-5a3b-432f-a7b3-72384eeb9b4b.png" alt="HOPE on product" className="h-8 w-auto" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <product.icon className="h-8 w-8 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white/60">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="scroll-animate opacity-0 translate-y-8 text-4xl font-bold text-slate-900 mb-6">
                Pse të Zgjidhni HOPE?
              </h2>
              <div className="space-y-6">
                <div className="scroll-animate opacity-0 translate-y-8 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Materiale me Cilësi Premium</h3>
                    <p className="text-slate-600">Ne përdorim vetëm materialet më të mira për të siguruar që shtypjet tuaja të duken mahnitëse dhe të zgjatin më gjatë.</p>
                  </div>
                </div>
                <div className="scroll-animate opacity-0 translate-y-8 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Ekip Ekspert Dizajni</h3>
                    <p className="text-slate-600">Dizajnerët tanë të talentuar punojnë me ju për të krijuar dizajne mahnitëse dhe unike që kapin vizionin tuaj.</p>
                  </div>
                </div>
                <div className="scroll-animate opacity-0 translate-y-8 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-slate-500 to-sky-500 rounded-full flex items-center justify-center">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Realizim i Shpejtë</h3>
                    <p className="text-slate-600">Kohë të shpejta prodhimi pa kompromentuar cilësinë. Merrni porositë tuaja kur t'ju duhen.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-animate opacity-0 translate-y-8">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80" alt="Printing process" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-sky-300 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="scroll-animate opacity-0 translate-y-8 text-4xl font-bold text-slate-900 mb-4">
              Çfarë Thonë Klientët Tanë
            </h2>
            <p className="scroll-animate opacity-0 translate-y-8 text-xl text-slate-600">
              Bashkohu me mijëra klientë të lumtur që i besojnë HOPE për nevojat e tyre të shtypjes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="scroll-animate opacity-0 translate-y-8 p-6 bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-blue-400 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-blue-500 via-sky-500 to-slate-500">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="scroll-animate opacity-0 translate-y-8 text-4xl font-bold text-white mb-6">
            Gati të Sillni Idetë Tuaja në Jetë?
          </h2>
          <p className="scroll-animate opacity-0 translate-y-8 text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Filloni udhëtimin tuaj krijues me Hope Print sot. Ngarkoni dizajnin tuaj ose punoni me ekipin tonë për të krijuar diçka mahnitëse.
          </p>
          <div className="scroll-animate opacity-0 translate-y-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Fillo Tani
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Na Kontaktoni
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-800 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/lovable-uploads/9ae32d82-5a3b-432f-a7b3-72384eeb9b4b.png" alt="HOPE Logo" className="h-8 w-auto mr-3" />
            </div>
            <p className="text-slate-400 mb-6">
              Duke transformuar idetë në realitet të shtypura të bukura me kreativitet dhe kujdes
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-slate-300">
            <a href="tel:+38345424872" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
              <Phone className="h-5 w-5" />
              <span>+383 45 424 872</span>
            </a>
            <a href="https://instagram.com/hopeprint.ks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
              <Instagram className="h-5 w-5" />
              <span>@hopeprint.ks</span>
            </a>
            <a href="https://facebook.com/HopePrint.Ks" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
              <Facebook className="h-5 w-5" />
              <span>HopePrint.Ks</span>
            </a>
          </div>

          <div className="flex justify-center space-x-6 text-sm text-slate-400 border-t border-slate-700 pt-6">
            <a href="#" className="hover:text-white transition-colors">Politika e Privatësisë</a>
            <a href="#" className="hover:text-white transition-colors">Kushtet e Shërbimit</a>
            <a href="#" className="hover:text-white transition-colors">Kontakti</a>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;