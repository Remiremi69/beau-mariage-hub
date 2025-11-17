import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-anthracite text-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Le Beau Mariage</h3>
            <p className="text-sm opacity-90">
              Votre mariage de rêve, le stress en moins, le budget en plus.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/concept" className="hover:text-primary transition-colors">
                  Le Concept
                </Link>
              </li>
              <li>
                <Link to="/serie-ete-2027" className="hover:text-primary transition-colors">
                  Série Été 2027
                </Link>
              </li>
              <li>
                <Link to="/experience-essayage" className="hover:text-primary transition-colors">
                  Expérience essayage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contactez-nous</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@lebeaumariage.fr" className="hover:text-primary transition-colors">
                  contact@lebeaumariage.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+33612345678" className="hover:text-primary transition-colors">
                  06 12 34 56 78
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a
                  href="https://instagram.com/lebeaumariage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @lebeaumariage
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-card/20 text-center text-sm opacity-75">
          <p>© {new Date().getFullYear()} Le Beau Mariage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
