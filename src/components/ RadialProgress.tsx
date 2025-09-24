type RadialProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100
  rating?: string | number; // for center text
  circleOneStroke?: string;
  circleTwoStroke?: string;
};

export default function RadialProgress({
  size = 50,
  strokeWidth = 6,
  progress,
  rating,
  circleOneStroke = 'var(--muted)',
  circleTwoStroke = 'var(--primary)',
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          stroke={circleOneStroke}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={circleTwoStroke}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {rating && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={size * 0.32}
            fontWeight={600}
            fill="var(--foreground)"
          >
            {rating}
          </text>
        )}
      </svg>
    </div>
  );
}
