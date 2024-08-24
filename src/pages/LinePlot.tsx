import { useState } from "react";
import * as d3 from "d3";
import Home from "./Home";

interface Props {
    data?: number[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}

export default function LinePlot({
    data = Array(50),
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20
}: Props) {
    const [amplitude, _setAmplitude] = useState(1);
    const [frequency, _setFrequency] = useState(1);

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([marginLeft, width - marginRight]);
    const y = d3.scaleLinear().domain([-amplitude, amplitude]).range([height - marginBottom, marginTop]);

    const line = d3
        .line<number>()
        .x((_d, i) => x(i))
        .y((_d, i) => y(amplitude * Math.sin(frequency * i)));

    return (
        <>
            <Home/>
            <div style={{ marginBottom: "10px" }}>
            </div>
            <svg width={width} height={height}>
                <path fill="none" stroke="var(--tw-ring-offset-color)" strokeWidth="1.5" d={String(line(data))} />
                <g fill="white" stroke="currentColor" strokeWidth="1.5">
                    {data.map((_d, i) => (
                        <circle key={i} cx={x(i)} cy={y(amplitude * Math.sin(frequency * i))} r="2.5" />
                    ))}
                </g>
            </svg>
        </>
    );
}
