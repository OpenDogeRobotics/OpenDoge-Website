import { LEGS, type LegId } from "@/data/specs";
import { cn } from "@/utils/cn";

type Pt = [number, number];
type LegGeom = { hip: Pt; thigh: Pt; calf: Pt; foot: Pt; labelSide: "left" | "right" };

const GEOM: Record<LegId, LegGeom> = {
  FL: { hip: [118, 132], thigh: [80, 106], calf: [56, 60], foot: [50, 24], labelSide: "left" },
  FR: { hip: [242, 132], thigh: [280, 106], calf: [304, 60], foot: [310, 24], labelSide: "right" },
  RL: { hip: [118, 308], thigh: [80, 334], calf: [56, 380], foot: [50, 416], labelSide: "left" },
  RR: { hip: [242, 308], thigh: [280, 334], calf: [304, 380], foot: [310, 416], labelSide: "right" },
};

type Props = {
  active: LegId;
  onSelect: (id: LegId) => void;
  onHover?: (id: LegId | null) => void;
  className?: string;
};

export function RobotDiagram({ active, onSelect, onHover, className }: Props) {
  return (
    <svg viewBox="0 0 360 440" className={cn("h-auto w-full select-none", className)} role="img" aria-label="OpenDoge top-down joint map">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1c23" />
          <stop offset="1" stopColor="#101015" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Body */}
      <rect x="120" y="80" width="120" height="280" rx="24" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.14)" />
      <rect x="138" y="150" width="84" height="120" rx="10" fill="#0a0a0d" stroke="rgba(255,255,255,0.1)" />
      <rect x="150" y="162" width="60" height="6" rx="3" fill="rgba(52,211,153,0.45)" />
      <rect x="150" y="176" width="40" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <rect x="150" y="186" width="52" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <g>
        <rect x="166" y="236" width="28" height="20" rx="4" fill="#15151b" stroke="rgba(255,255,255,0.14)" />
        <text x="180" y="249.5" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="#9ca3af">
          IMU
        </text>
      </g>
      <text x="180" y="112" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#6b7280" letterSpacing="2">
        FRONT
      </text>
      <path d="M172 98 L180 88 L188 98" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="180" y="338" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fill="#4b5563" letterSpacing="2">
        RK3588
      </text>

      {/* Legs */}
      {LEGS.map((leg) => {
        const g = GEOM[leg.id];
        const isActive = leg.id === active;
        const stroke = isActive ? leg.color : "rgba(255,255,255,0.16)";
        const path = `M${g.hip[0]} ${g.hip[1]} L${g.thigh[0]} ${g.thigh[1]} L${g.calf[0]} ${g.calf[1]} L${g.foot[0]} ${g.foot[1]}`;
        const joints: { p: Pt; id: number }[] = [
          { p: g.hip, id: leg.motors[0] },
          { p: g.thigh, id: leg.motors[1] },
          { p: g.calf, id: leg.motors[2] },
        ];
        const labelX = g.labelSide === "left" ? g.hip[0] - 62 : g.hip[0] + 62;
        const labelY = g.hip[1] + (leg.id.startsWith("F") ? 34 : -28);

        return (
          <g
            key={leg.id}
            className="cursor-pointer transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0.75 }}
            onClick={() => onSelect(leg.id)}
            onMouseEnter={() => onHover?.(leg.id)}
            onMouseLeave={() => onHover?.(null)}
            role="button"
            aria-label={leg.id}
            aria-pressed={isActive}
          >
            {/* Hit area */}
            <path d={path} stroke="transparent" strokeWidth="34" fill="none" strokeLinecap="round" />
            {/* Limb */}
            <path
              d={path}
              stroke={stroke}
              strokeWidth={isActive ? 9 : 7}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
              filter={isActive ? "url(#glow)" : undefined}
              opacity={isActive ? 0.55 : 1}
            />
            {/* Joints */}
            {joints.map((j) => (
              <g key={j.id}>
                <circle
                  cx={j.p[0]}
                  cy={j.p[1]}
                  r="10.5"
                  fill="#0c0c10"
                  stroke={isActive ? leg.color : "rgba(255,255,255,0.28)"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <circle cx={j.p[0]} cy={j.p[1]} r="3" fill={isActive ? leg.color : "rgba(255,255,255,0.3)"} />
                <text
                  x={j.p[0] + (g.labelSide === "left" ? -18 : 18)}
                  y={j.p[1] + 3.5}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  fill={isActive ? leg.color : "#6b7280"}
                >
                  {j.id}
                </text>
              </g>
            ))}
            {/* Foot */}
            <circle cx={g.foot[0]} cy={g.foot[1]} r="6" fill={isActive ? leg.color : "#3f3f46"} className="transition-all duration-300" />
            {/* Label */}
            <g transform={`translate(${labelX}, ${labelY})`}>
              <rect
                x="-26"
                y="-11"
                width="52"
                height="22"
                rx="6"
                fill={isActive ? `${leg.color}22` : "rgba(255,255,255,0.03)"}
                stroke={isActive ? leg.color : "rgba(255,255,255,0.12)"}
                className="transition-all duration-300"
              />
              <text
                y="3.5"
                textAnchor="middle"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                fill={isActive ? leg.color : "#a1a1aa"}
              >
                {leg.id} · {leg.can}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
