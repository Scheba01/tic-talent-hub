import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-muted-foreground hover:text-primary transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/servicios-para-empresas" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios para Empresas
                </Link>
              </li>
              <li>
                <Link to="/vacantes-y-perfiles" className="text-muted-foreground hover:text-primary transition-colors">
                  Vacantes y Perfiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Comunidad</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programa-talentotic" className="text-muted-foreground hover:text-primary transition-colors">
                  Programa TalentoTIC
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#programa-afiliados" className="text-muted-foreground hover:text-primary transition-colors">
                  Programa de Afiliados
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contacto@ticselect.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contacto@ticselect.com
                </a>
              </li>
              <li>
                <a href="tel:+56XXXXXXX" className="text-muted-foreground hover:text-primary transition-colors">
                  +56 9 XXXX XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Programa de Afiliados */}
        <div className="mt-12 pt-8 border-t border-border">
          
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-display font-bold text-xl mb-4 md:mb-0">
              <span className="text-foreground">TIC</span>
              <span className="text-primary">SELECT</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 TIC SELECT. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;