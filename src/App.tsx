import  { ChangeEvent, useRef, useState } from 'react';
import './App.css';
import * as Tone from 'tone';
import * as d3 from 'd3';

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [numeros, setNumeros] = useState<number[]>([100, 115, 120, 115]);


  function toque() {
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease([numeros[0], numeros[1], numeros[2], numeros[3]], 1,now);
    synth.triggerAttackRelease([125], .5,now+1);
    synth.triggerAttackRelease([80], .5,now+1.5);
    const analyser = new Tone.Analyser('waveform', 1024);
    synth.connect(analyser);

    visualize(analyser);
  }
  
  function visualize(analyser: Tone.Analyser, tam?:number = 1024) {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    svg.selectAll('*').remove(); // Clear previous visualization

    const xScale = d3.scaleLinear().domain([0, tam]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

    function draw() {
      const dataArray = analyser.getValue();

      const line = d3.line<number>()
        .x((d, i) => xScale(i))
        .y(d => yScale(d as number))
        .curve(d3.curveBasis);

      svg.selectAll('path')
        .data([Array.from(dataArray)])
        .join('path')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue');

      requestAnimationFrame(draw);
    }

    draw();

  }
  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    const newNumeros = [...numeros];
    newNumeros[index] = newValue;
    setNumeros(newNumeros);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        {numeros.map((numero, index) => (
          <div key={index}>
            <input
              type="number"
              value={numero}
              onChange={handleChange(index)}
            />
          </div>
        ))}
        <button onClick={toque}>Click</button>
        <svg ref={svgRef} width="800" height="400"></svg>
      </div>
    </>
  );
}

export default App;
