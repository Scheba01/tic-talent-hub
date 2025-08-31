import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "El Futuro de la Certificación TIC en Chile: Tendencias 2024",
      excerpt: "Descubre las principales tendencias que están definiendo el panorama de certificaciones TIC en Chile y cómo prepararte para el futuro.",
      author: "Equipo TIC Select",
      date: "15 de Febrero, 2024",
      readTime: "5 min",
      category: "Certificaciones",
      image: "/lovable-uploads/cde2ecac-14de-4f21-b255-6c178be36999.png"
    },
    {
      id: 2,
      title: "Cómo Destacar en el Proceso de Selección TIC",
      excerpt: "Consejos prácticos para profesionales TIC que buscan optimizar su perfil y destacar en procesos de selección especializados.",
      author: "María González",
      date: "8 de Febrero, 2024",
      readTime: "7 min",
      category: "Carrera Profesional",
      image: "/lovable-uploads/aa173f7b-4df3-46c2-a94d-5be3c0deb921.png"
    },
    {
      id: 3,
      title: "Demanda de Perfiles TIC: Análisis del Mercado Laboral",
      excerpt: "Un análisis profundo de los perfiles TIC más demandados en el mercado chileno y las oportunidades emergentes.",
      author: "Carlos Mendoza",
      date: "1 de Febrero, 2024",
      readTime: "6 min",
      category: "Mercado Laboral",
      image: "/lovable-uploads/42d7e844-a2f7-47e6-9cbc-b08fab2c11e2.png"
    },
    {
      id: 4,
      title: "Certificaciones Internacionales vs. Locales: ¿Cuál Elegir?",
      excerpt: "Comparamos las ventajas y desventajas de las certificaciones internacionales versus las certificaciones locales en el contexto chileno.",
      author: "Ana Fuentes",
      date: "25 de Enero, 2024",
      readTime: "8 min",
      category: "Certificaciones",
      image: "/lovable-uploads/ba80b9bd-3338-4001-8cef-262bfeeb87db.png"
    },
    {
      id: 5,
      title: "Networking en el Sector TIC: Construyendo Conexiones Valiosas",
      excerpt: "Estrategias efectivas para construir una red profesional sólida en el sector TIC y aprovechar las oportunidades de crecimiento.",
      author: "Roberto Silva",
      date: "18 de Enero, 2024",
      readTime: "5 min",
      category: "Networking",
      image: "/lovable-uploads/384b0134-c54d-4f2d-9d89-8174e50ed97b.png"
    }
  ];

  const categories = ["Todos", "Certificaciones", "Carrera Profesional", "Mercado Laboral", "Networking"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
                Blog TIC Select
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Insights, tendencias y consejos del mundo TIC para impulsar tu carrera profesional
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No se encontraron artículos que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full mt-4 group">
                        Leer más
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Mantente al día con TIC Select
            </h2>
            <p className="text-muted-foreground mb-8">
              Suscríbete a nuestro newsletter y recibe las últimas tendencias, oportunidades y consejos del sector TIC directamente en tu inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1"
              />
              <Button>
                Suscribirse
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;