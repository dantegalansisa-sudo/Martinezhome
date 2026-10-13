import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../useTitle';

export default function NotFound() {
  useSeo({ title: 'Página no encontrada', noindex: true });
  return (
    <section className="notfound">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="page-head__title">Esta página no existe</h1>
        <p className="page-head__lead">Puede que la propiedad ya no esté disponible o que el enlace haya cambiado.</p>
        <Link to="/propiedades" className="btn-dark">Ver propiedades <span className="btn-dark__icon"><ArrowRight size={15} /></span></Link>
      </div>
    </section>
  );
}
