interface Props {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format: (n: number) => string;
  label: string;
}

/** Dual-thumb range built from two native range inputs (keyboard + touch friendly). */
export default function RangeSlider({ min, max, step, value, onChange, format, label }: Props) {
  const [lo, hi] = value;
  const pct = (n: number) => ((n - min) / (max - min)) * 100;
  return (
    <div className="range">
      <div className="range__values">
        <span>{format(lo)}</span>
        <span>{hi >= max ? `${format(max)}+` : format(hi)}</span>
      </div>
      <div className="range__track">
        <span className="range__fill" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={lo} aria-label={`${label} mínimo`}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - step), hi])}
        />
        <input
          type="range" min={min} max={max} step={step} value={hi} aria-label={`${label} máximo`}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + step)])}
        />
      </div>
    </div>
  );
}
