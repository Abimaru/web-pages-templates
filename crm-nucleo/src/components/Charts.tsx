/* Gráficos en SVG puro (sin librerías). */

export function LineAreaChart({ data, color = "#4f46e5", height = 200 }: { data: { m: string; v: number }[]; color?: string; height?: number }) {
  const W = 520, H = height, PAD = 28;
  const max = Math.max(...data.map((d) => d.v)) * 1.15;
  const min = 0;
  const range = Math.max(max - min, 1);
  const pts = data.map((d, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((d.v - min) / range) * (H - PAD * 2);
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - PAD} L${pts[0][0].toFixed(1)},${H - PAD} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      <defs>
        <linearGradient id="laGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={PAD} x2={W - PAD} y1={H - PAD - g * (H - PAD * 2)} y2={H - PAD - g * (H - PAD * 2)} stroke="#eef0f5" strokeWidth={1} />
      ))}
      <path d={area} fill="url(#laGrad)" />
      <path d={line} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={1200} strokeDashoffset={1200} style={{ animation: "draw 1.5s ease-out forwards" }} />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="#fff" stroke={color} strokeWidth={2} />
      ))}
      {data.map((d, i) => (
        <text key={d.m} x={pts[i][0]} y={H - 8} textAnchor="middle" fontSize={11} fill="#9aa0b4">{d.m}</text>
      ))}
      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}

export function DonutChart({ data, size = 180 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 16;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * c;
          const seg = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={16}
              strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-offset} strokeLinecap="butt" />
          );
          offset += dash;
          return seg;
        })}
      </g>
      <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fontSize={26} fontWeight={800} fill="#1a1d29" fontFamily="Plus Jakarta Sans">{total}%</text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" fontSize={11} fill="#9aa0b4">del total</text>
    </svg>
  );
}

export function BarChart({ data, color = "#4f46e5", height = 200 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const W = 520, H = height, PAD = 28;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const bw = (W - PAD * 2) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={PAD} x2={W - PAD} y1={H - PAD - g * (H - PAD * 2)} y2={H - PAD - g * (H - PAD * 2)} stroke="#eef0f5" strokeWidth={1} />
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * (H - PAD * 2);
        const x = PAD + i * bw + bw * 0.22;
        const w = bw * 0.56;
        return (
          <g key={d.label}>
            <rect x={x} y={H - PAD - h} width={w} height={h} rx={5} fill={color} opacity={0.85}>
              <animate attributeName="height" from="0" to={h} dur="0.8s" fill="freeze" />
              <animate attributeName="y" from={H - PAD} to={H - PAD - h} dur="0.8s" fill="freeze" />
            </rect>
            <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="#9aa0b4">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}
