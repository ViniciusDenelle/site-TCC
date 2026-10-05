import { memo } from "react";

type Props = {
    tempo: number;
    tempoInicial: number;
    size?: number;
    strokeWidth?: number;
};

const TimerCircular = ({
    tempo,
    tempoInicial,
    size = 120,
    strokeWidth = 8,
}: Props) => {
    const progress = tempo / tempoInicial;

    const center = size / 2;
    const radius = center - strokeWidth / 2;

    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#333"
                strokeWidth={strokeWidth}
            />

            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#22c55e"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                    transition: "stroke-dashoffset 1s linear",
                }}
            />
        </svg>
    );
};

export default memo(TimerCircular)