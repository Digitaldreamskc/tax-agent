"use client";

export default function Back2KCLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = {
    sm: { width: 100, height: 32, fontSize: 10, arrowSize: 8 },
    md: { width: 140, height: 42, fontSize: 13, arrowSize: 10 },
    lg: { width: 180, height: 54, fontSize: 17, arrowSize: 13 },
  };
  const d = dimensions[size];

  return (
    <svg
      width={d.width}
      height={d.height}
      viewBox={`0 0 ${d.width} ${d.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue rounded rectangle background */}
      <rect
        x="0"
        y="0"
        width={d.width}
        height={d.height}
        rx="8"
        ry="8"
        fill="#00AEEF"
      />
      {/* BACK text */}
      <text
        x={d.width * 0.08}
        y={d.height * 0.48}
        fill="white"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="800"
        fontSize={d.fontSize}
        letterSpacing="1"
        dominantBaseline="middle"
      >
        BACK
      </text>
      {/* Orange triangle arrow */}
      <polygon
        points={`
          ${d.width * 0.44},${d.height * 0.22}
          ${d.width * 0.44 + d.arrowSize},${d.height * 0.5}
          ${d.width * 0.44},${d.height * 0.78}
        `}
        fill="#F7941D"
      />
      {/* 2KC text */}
      <text
        x={d.width * 0.52}
        y={d.height * 0.48}
        fill="white"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="800"
        fontSize={d.fontSize}
        letterSpacing="1"
        dominantBaseline="middle"
      >
        2KC
      </text>
    </svg>
  );
}
