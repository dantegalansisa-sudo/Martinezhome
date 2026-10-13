import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { mortgage } from '../calc';
import { EASINGS } from '../easings';

/** A slim, single-slider taste of the full calculator so the home stays light. */
export default function CalcTeaser() {
  const [price, setPrice] = useState(180000);
  const { monthly } = mortgage({ price, downPct: 20, rate: 11, years: 20 });
  return (
    <section className="calc-teaser">
      <motion.div
        className="container calc-teaser__inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASINGS.smooth }}
      >
        <div className="calc-teaser__text">
          <span className="calc-teaser__icon"><Calculator size={22} /></span>
          <div>
            <p className="eyebrow eyebrow--light">Calculadora hipotecaria</p>
            <h2 className="calc-teaser__title">¿Cuánto pagarías al mes?</h2>
          </div>
        </div>
        <div className="calc-teaser__control">
          <label htmlFor="teaser-price">Precio de la propiedad <strong>US$ {price.toLocaleString('en-US')}</strong></label>
          <input id="teaser-price" type="range" min={80000} max={500000} step={5000} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <small>20% de inicial · 11% anual · 20 años</small>
        </div>
        <div className="calc-teaser__result">
          <small>Cuota estimada</small>
          <motion.strong key={Math.round(monthly)} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            US$ {Math.round(monthly).toLocaleString('en-US')}
          </motion.strong>
          <Link to={`/calculadora?precio=${price}`} className="calc-teaser__link">Calcular en detalle <ArrowRight size={15} /></Link>
        </div>
      </motion.div>
    </section>
  );
}
